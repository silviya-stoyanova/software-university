const Order = require('../models/Order')
const Doner = require('../models/Doner')
const User = require('../models/User')

module.exports = {

    orderGet: async (req, res) => {
        let doner = await Doner.findById(req.params.donerId) //.populate('author')
        doner.category = doner.category[0].toUpperCase() + doner.category.slice(1)
        doner.toppings
        res.render('order/makeOrder', doner)
    },

    orderPost: async (req, res) => {
        console.log(req.body)

        const newOrder = {
            creator: req.user._id,
            product: req.params.donerId,
            toppings: [],
            status: 'pending',
        }

        if (req.body.pickle === 'checked') {
            newOrder.toppings.push('pickle')
        }
        if (req.body.tomato === 'checked') {
            newOrder.toppings.push('tomato')
        }
        if (req.body.onion === 'checked') {
            newOrder.toppings.push('onion')
        }
        if (req.body.lettuce === 'checked') {
            newOrder.toppings.push('lettuce')
        }
        if (req.body.hotSauce === 'checked') {
            newOrder.toppings.push('hotSauce')
        }
        if (req.body.extraSauce === 'checked') {
            newOrder.toppings.push('extraSauce')
        }

        const order = await Order.create(newOrder)
        User.findByIdAndUpdate(req.user._id, {
            $push: { orders: order._id }
        })
        res.redirect(`/order/details/${order._id}`)
    },

    orderDetails: async (req, res) => {
        let order = await Order.findById(req.params.orderId).populate('product')
        order.product.category = order.product.category[0].toUpperCase() + order.product.category.slice(1)
        console.log(order)

        order.statuses = {
            isPending: order.status === 'pending' ? 'current' : null,
            isInProgress: order.status === 'inProgress' ? 'current' : null,
            isInTransit: order.status === 'inTransit' ? 'current' : null,
            isDelivered: order.status === 'delivered' ? 'current' : null
        }

        res.render('order/details', order)
    },

    orderEditPost: async (req, res) => {
        console.log(req.body)

        for (let key in req.body) {
            await Order.findByIdAndUpdate(key, {
                status: req.body[key]
            })
        }

        res.redirect('/')
    },

    getOrdersByCriteria: async (req, res) => {
        let filter = {}
        req.url === '/user/orders'
            ? filter = { creator: req.user._id }
            : filter = {}

        const filteredOrders = await Order.find(filter).populate('product')

        if (filteredOrders.length > 0) {
            filteredOrders.map(order => {
                order.product.category = order.product.category[0].toUpperCase() + order.product.category.slice(1)
                order.statuses = {
                    isPending: order.status === 'pending' ? 'selected' : null,
                    isInProgress: order.status === 'inProgress' ? 'selected' : null,
                    isInTransit: order.status === 'inTransit' ? 'selected' : null,
                    isDelivered: order.status === 'delivered' ? 'selected' : null
                }
                order.status = order.status[0].toUpperCase() + order.status.slice(1)
            })
        }
        res.render('order/status', { orders: filteredOrders })
    }

}
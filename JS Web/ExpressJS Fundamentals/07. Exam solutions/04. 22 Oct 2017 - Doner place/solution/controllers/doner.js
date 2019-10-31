const Doner = require('../models/Doner')
const Order = require('../models/Order')
const User = require('../models/User')

module.exports = {
    createGet: (req, res) => {
        res.render('doner/create')
    },

    createPost: async (req, res) => {
        let doner = req.body
        const availableToppings = ['pickle', 'tomato', 'onion', 'lettuce', 'hotSauce', 'extraSauce']

        if (doner.size < 17 || doner.size > 24) {
            console.log('Invalid doner size!')
            return res.redirect('/')
        }
        if (!doner.imageUrl.match(/^(http(s)*:\/\/)(.+)[\.jpegpn]/)) {
            console.log('Invalid image!')
            return res.redirect('/')
        }

        doner.toppings = doner.toppings.split(', ')
        let toppingsWarning = false
        doner.toppings.map(t => {
            if (!availableToppings.includes(t)) {
                console.log('One or more of the chosen toppings is not offered by us!')
                return toppingsWarning = true
            }
        })
        if (toppingsWarning) {
            return res.redirect('/')
        }

        await Doner.create(doner)
        res.redirect('/')
    },

    editGet: async (req, res) => {
        const doner = await Doner.findById(req.params.donerId)
        doner.categories = {
            isBeef: doner.category === 'beef' ? 'selected' : null,
            isChicken: doner.category === 'chicken' ? 'selected' : null,
            isLamb: doner.category === 'lamb' ? 'selected' : null,
        }
        doner.toppings = doner.toppings.join(', ')
        res.render('doner/edit', doner)
    },

    editPost: (req, res) => {
        const doner = req.body
        doner.toppings = doner.toppings.split(', ')
        const availableToppings = ['pickle', 'tomato', 'onion', 'lettuce', 'hotSauce', 'extraSauce']
        let toppingsWarning = false

        if (doner.size < 17 || doner.size > 24) {
            console.log('Invalid doner size!')
            return res.redirect('/')
        }
        if (!doner.imageUrl.match(/^(http(s)*:\/\/)(.+)[\.jpegpn]/)) {
            console.log('Invalid image!')
            return res.redirect('/')
        }

        doner.toppings.map(t => {
            if (!availableToppings.includes(t)) {
                console.log('One or more of the chosen toppings is not offered by us!')
                return toppingsWarning = true
            }
        })
        if (toppingsWarning) {
            return res.redirect('/')
        }

        Doner.findByIdAndUpdate(req.params.donerId, doner,
            (error, response) => {
                if (error) {
                    return console.log(error)
                }
                res.redirect('/')
            })
    },

    deleteGet: async (req, res) => {
        let doner = await Doner.findById(req.params.donerId)
        // remove the doner
        doner.remove()
        // remove all the orders which include this doner
        Order.find({ product: req.params.donerId }).remove({})

        // remove all the orders which include this doner in User collection
        await User.find().populate('orders')
            .where({ ['orders'.product]: req.params.donerId })
            .update({
                $pull: { orders: req.params.donerId }
            })
        res.redirect('/')
    }
}
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    creator: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    product: { type: mongoose.SchemaTypes.ObjectId, ref: 'Doner' },
    date: { type: mongoose.SchemaTypes.Date, default: Date.now },
    toppings: { type: Array, enum: ['pickle', 'tomato', 'onion', 'lettuce', 'hotSauce', 'extraSauce'] },
    status: { type: String, default: 'pending', enum: ['pending', 'inProgress', 'inTransit', 'delivered'] }
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order
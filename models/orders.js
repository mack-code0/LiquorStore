const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Order = new Schema({
    order_by: {
        required: true,
        type: String
    },
    orders: {
        required: true,
        type: Array
    },
    date: {
        required: true,
        type: Date,
        default: Date()
    },
    status: {
        required: true,
        type: String,
        default: "Order Confirmed"
    },
    quantity: {
        required: true,
        type: Number
    },
    total_price: {
        type: Number,
        required: true
    },
    ref_num: {
        type: String,
        required: true
    }
})

const Model = mongoose.model("order", Order)
module.exports = Model
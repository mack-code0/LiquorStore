const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CartSchema = new Schema({
    product_id: String,
    quantity: Number,
    image: String,
    name: String,
    price: Number,
    date: Date,
    user_id: String
})

// CartSchema.plugin(autoincrement.plugin, {model: "Cart", field: "unique_id", startAt: 1})
const ModelCart = mongoose.model("Cart", CartSchema)

module.exports = ModelCart
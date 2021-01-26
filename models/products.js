const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ProductSchema = new Schema({
    name: String,
    manufacturer: String,
    price: Number,
    date: Date,
    quantity: Number,
    type: String,
    tag: String,
    image: String,
    description: String,
    ref: String, 
    sold: Number
})

const ModelProduct = mongoose.model("Product", ProductSchema)

module.exports = ModelProduct
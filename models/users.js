const mongoose = require("mongoose")

const Schema = mongoose.Schema

const User = new Schema({
    firstname: {
        type: String,
        required: [true, "Firstname is required"]
    },
    lastname: {
        type: String,
        required: [true, "Lastname is required"]
    },
    country: {
        type: String,
        required: [true, "Country is required"]
    },
    address: {
        type: String,
        required: [true, "Address is required"]
    },
    city: {
        type: String,
        required: [true, "City is required"]
    },
    postcode: {
        type: String,
        required: [true, "PostCode is required"]
    },
    phone: {
        type: Number,
        required: [true, "Phone is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    newsletter: {
        type: Boolean,
        default: false
    }
})

const Model = mongoose.model("user", User)
module.exports = Model
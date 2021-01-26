const express = require("express")
const route = express.Router()
const Order = require("./../models/orders")
const authenticate = require("./../config/auth").ensureApiAuthenticated

route.get("/get-orders", authenticate, (req, res)=>{
    Order.find({order_by: req.user.id}, (err, orders)=>{
        if(err) throw err
        res.json(orders)
    })
})

module.exports = route
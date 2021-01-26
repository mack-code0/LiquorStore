const express = require('express');
const route = express.Router()
const Products = require("../models/products")
const StoreDB = require("../models/storedb");


route.get("/", (req, res)=>{
    Products.find({}, (err, products)=>{
        if(err){
            res.send(err)
        }else{
            res.send(products)
        }
    }).limit(12)
})

route.get("/single-product", (req, res)=>{
    var product_id = req.query.product_id
    if(product_id == null || product_id == undefined){
        res.status(404).send({err: 404})
    }else{
        Products.findOne({_id: product_id}, (err, product)=>{
            if(err){
                res.status(404).send({err: 404})
            }else{
                res.send(product)
            }
        })
    }
})

route.get("/products", (req, res)=>{
    req.query.page = req.query.page===undefined?1:req.query.page
    var skip = Number((req.query.page-1)+"0")
    var limit = Number((req.query.page)+"0")
    Products.find({}, (err, products)=>{
        if(err){
            res.send("404")
        }else{
            Products.countDocuments({}, (err, product_length)=>{
                if(err){
                    res.send("404")
                }
                else{
                    var paginize = [];
                    if(product_length%10 > 0){
                        paginize.push(1)
                    }
                    for(i=0; i<Math.floor(product_length/10); i++){
                        paginize.push(1)
                    }
                    res.send({products, pages: paginize.length, currentPage: req.query.page})
                }
            })
        }
    }).skip(skip).limit(limit)
})

// Get products in cart
route.get("/cart", (req, res)=>{
    StoreDB.find({user_id: typeof req.user != "undefined"?req.user._id:"No-User"}, (err, products)=>{
        if(err){
            res.send("404")
        }else{
            res.send(products) 
        }
    })
 })


 // Add product to cart
 route.post("/add-to-cart", require("../config/auth").ensureApiAuthenticated, (req, res)=>{
    //  console.log(req.headers)
    //  console.log("___________________________")
    //     console.log(req.user);
    //     console.log(Object.keys(req.body))
    //  console.log("___________________________")
     StoreDB.findOne({user_id: typeof req.user != "undefined"?req.user._id:"No-User", product_id: req.body.id}, (err, data)=>{
                if(err){
                    res.send("404")
                }else{
                    // If the product has not been added to the cart before==>
                    if(data==null || data===undefined){
                        Products.findOne({_id: req.body.id}, (err, DBProduct)=>{
                            if(err){
                                res.send("404")
                            }else{
                                // Get the name, price and image from the object
                                const {name, price, image} = DBProduct
                                // Create a new object that'll be saved to the cart database
                                const product = {name, price, image, quantity: 1, product_id: req.body.id, date: new Date(), user_id: typeof req.user != "undefined"?req.user._id:"No-User"}
                                // Save the object to the database
                                const addcart = new StoreDB(product)
                                addcart.save((err, returnedData)=>{
                                    if(err){
                                        res.send(err)
                                    }else{
                                        // Send the saved object to the clientside
                                        res.send(returnedData)
                                    }
                                })
                            }
                        })
                    }
                    // If the product is already in the cart==>
                    else{
                    // Get the former quantity and increase it by 1
                    const newQuantity = data.quantity+1
                    // update only the quantity and date properties to thier latest values
                    StoreDB.findOneAndUpdate({user_id: typeof req.user != "undefined"?req.user._id:"No-User", product_id: req.body.id}, {quantity: newQuantity, date: new Date()}, {new: true}, (err, returnedData)=>{
                        if(err){
                            res.send("404")
                        }else{
                                // Send the updated value to the client
                                res.send(returnedData) ;
                        }
                    })
                    }
                }
        })
})


// Show cart in card
route.get("/display-cart", (req, res)=>{
    // Get four products sorted by date from the cart database
    StoreDB.find({user_id: typeof req.user != "undefined"?req.user._id:"No-User"}, (err, data)=>{
        if(err){
            res.send("404")
        }else{
            // Get all the quantity properties from the cart database
            StoreDB.find({user_id: typeof req.user != "undefined"?req.user._id:"No-User"}, "quantity", (err, data1)=>{
                if(err){
                    res.send("err")
                }else{
                    // Save all the quantity properties to an array
                    const quantity = data1.map((element)=>element.quantity)
                    // Add all the quantities in the array
                    const cartTotal = quantity.reduce((total, currentVal)=>total+currentVal, 0)
                    // Add the total quantities to the object holding the 4 products queried in the begining
                    data.push({"cartTotal": cartTotal})
                    // Send the object to the client
                    res.send(data)
                }
            })
        }
    }).sort({date:"desc"}).limit(4)
})


module.exports = route
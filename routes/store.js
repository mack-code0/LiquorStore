const express = require('express');
const route = express.Router()
const axios = require("axios").default
const passport = require("passport")
const Auth = require("../config/auth")
const Store = require("./../models/storedb")
const Orders = require("./../models/orders")

route.get("/", (req, res)=>{
    axios({
        method: "get",
        url: `${req.protocol}://${req.get("host")}/api`,
        responseType: "json",
        headers: {
            cookie: req.headers.cookie || "No-Cookie"
        }
    }).then((resp)=>{
        res.render("index", {
            user: {loggedIn: req.user?true:false},
            data: {products: resp.data, indexactive: "active"}
        })
    })
})

route.get("/product-single", (req, res)=>{
    axios({
        method: "get",
        params: {product_id: req.query.product},
        url: `${req.protocol}://${req.get("host")}/api/single-product`,
        responseType: "json",
        headers: {
            cookie: req.headers.cookie || "No-Cookie"
        }
    }).then((resp)=>{
        res.render("product-single", {user: {loggedIn: req.user?true:false}, data: {product: resp.data, productactive: "active"}})
    })
})

route.get("/products", (req, res)=>{
    axios({
        method: "get",
        params: {page: req.query.page},
        url: `${req.protocol}://${req.get("host")}/api/products`,
        responseType: "json",
        headers: {
            cookie: req.headers.cookie || "No-Cookie"
        }
    }).then((resp)=>{
        res.render("product", {
            user: {loggedIn: req.user?true:false},
            data: {products: resp.data.products, pages: resp.data.pages, currentPage: resp.data.currentPage, productactive: "active"}
        })
    })
})

route.get("/cart", (req, res)=>{
    axios({
        method: "get",
        params: {page: req.query.page},
        url: `${req.protocol}://${req.get("host")}/api/cart`,
        responseType: "json",
        headers: {
            cookie: req.headers.cookie || "No-Cookie"
        }
    }).then((resp)=>{
        res.render("cart", {user: {loggedIn: req.user?true:false}, data: {products: resp.data, cartactive: "active"}}) 
    })
})

route.post("/add-to-cart", (req, res)=>{
    axios({
        method: "POST",
        data: {id:req.body.id},
        url: `${req.protocol}://${req.get("host")}/api/add-to-cart`,
        headers: {
            cookie: req.headers.cookie || "No-Cookie"
        }
    }).then((resp)=>{
        res.json(resp.data) 
    })
})

route.get("/display-cart", (req, res)=>{
    axios({
        method: "get",
        url: `${req.protocol}://${req.get("host")}/api/display-cart`,
        responseType: "json",
        headers: {
            cookie: req.headers.cookie || "No-Cookie"
        }
    }).then((resp)=>{
        res.json(resp.data) 
    })
})

route.get("/about", (req, res)=>{
    res.render("about", {user: {loggedIn: req.user?true:false}, data: {aboutactive: "active"}})
})

route.get("/blog", Auth.ensureAuthenticated, (req, res)=>{
    res.render("blog", {user: {loggedIn: req.user?true:false}, data: {blogactive: "active"}})   
})

route.get("/blog-single", (req, res)=>{
    res.render("blog-single", {user: {loggedIn: req.user?true:false}, data: {bsingleactive: "active"}})
})

route.get("/checkout", Auth.ensureAuthenticated, Auth.ensureCheckout2, (req, res)=>{
    if(req.query.paym){
        req.session.checkout = {state: true}
    }
    axios({
        method: "get",
        params: {page: req.query.page},
        url: `${req.protocol}://${req.get("host")}/api/cart`,
        responseType: "json",
        headers: {
            cookie: req.headers.cookie || "No-Cookie"
        }
    }).then((resp)=>{
        res.render("checkout", {
            user: {
                loggedIn: req.user?true:false, 
                details: req.user
            }, 
            data: {
                checkoutactive: "active", 
                paym: req.query.paym || false, 
                dispfooter: true,
                shipment: resp.data
            }
        })
    })
})

route.post("/submit-order", Auth.ensureAuthenticated, Auth.ensureCheckout, (req, res)=>{
    Store.find({user_id: req.user.id}, (err, cart)=>{
        if (err) throw err
        const saveOrders = new Orders(require("../functions/createOrder")(cart, req.user._id))
        saveOrders.save((err, saved)=>{
            if(err) throw err
            Store.deleteMany({user_id: req.user._id}, (err, deleted)=>{
                if(err) throw err
                console.log(deleted);
                req.flash("order_num", saved.ref_num)
                res.json(saved.ref_num)
            })
        })
    })
})

route.get("/confirm-order", Auth.ensureAuthenticated, Auth.ensureCheckout, (req, res)=>{
    req.session.checkout = undefined
    res.render("confirm-order", {user: {loggedIn: req.user?true:false}, data: {checkoutactive: "active", dispfooter: true}})
})


route.get("/contact", (req, res)=>{
    console.log(req.user);
    res.render("contact", {user: {loggedIn: req.user?true:false}, data: {contactactive: "active"}})
})

module.exports = route
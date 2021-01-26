const express = require("express")
const route = express.Router()
const url = require("url")
const axios = require("axios").default
const passport = require("passport")
const changePassword = require("./../config/changepassword")
const authenticated = require("./../config/auth").ensureAuthenticated
const validate = require("./../config/userconfig").validatepp

route.get("/account", authenticated, (req, res)=>{
    const {firstname, lastname, email, newsletter, address, city, country} = req.user
    res.render("users/index", {
        user: {loggedIn: req.user?true:false},
        data: {signupactive: "active", userInfo: {firstname, lastname, email, newsletter, address, city, country}},
        query: req.query
    })
})

route.get("/orders", authenticated, (req, res)=>{
    axios({
        method: "get",
        url: `${req.protocol}://${req.get("host")}/api/get-orders`,
        responseType: "json",
        headers: {
            cookie: req.headers.cookie || "No-Cookie"
        }
    }).then((resp)=>{
        const orders_array = resp.data.map(elmnt=>
            elmnt.orders.map(ords=> {
                return {name:ords.name, image:ords.image, order_id: elmnt.ref_num, quantity: ords.quantity, status: elmnt.status}
            })
        )
        res.render("users/orders", {
            user: {loggedIn: req.user?true:false},
            data: {signupactive: "active", orders: orders_array},
            query: req.query
        })
    })
})

route.get("/password", authenticated, (req, res)=>{
    res.render("users/password", {
        user: {loggedIn: req.user?true:false},
        data: {signupactive: "active"},
        query: req.query
    })
})

route.post("/password", authenticated, (req, res)=>{
    changePassword(req, res)
})

route.get("/voucher", authenticated, (req, res)=>{
    res.render("users/voucher", {
        user: {loggedIn: req.user?true:false},
        data: {signupactive: "active"},
        query: req.query
    })
})

route.get("/newsletter", authenticated, (req, res)=>{
    res.render("users/newsletter", {
        user: {loggedIn: req.user?true:false},
        data: {signupactive: "active"},
        query: req.query
    })
})

route.get("/saved", authenticated, (req, res)=>{
    res.render("users/saved", {
        user: {loggedIn: req.user?true:false},
        data: {signupactive: "active"},
        query: req.query
    })
})

route.get("/addressbook", authenticated, (req, res)=>{
    const {firstname, lastname, phone, address, city, country} = req.user
    res.render("users/addressbook", {
        user: {loggedIn: req.user?true:false},
        data: {signupactive: "active", userInfo: {firstname, lastname, address, city, country, phone}},
        query: req.query
    })
})

route.get("/details", authenticated, (req, res)=>{
    const {firstname, lastname, postcode, phone, address, city, country} = req.user
    res.render("users/details", {
        user: {loggedIn: req.user?true:false},
        data: {signupactive: "active", userInfo:{firstname, lastname, postcode, phone, address, city, country}},
        query: req.query
    })
})
route.post("/update-details", authenticated, (req, res)=>{
    console.log(req.body);
    axios({
        data: {data: req.body},
        method: "POST",
        url: `${req.protocol}://${req.get("host")}/api/update-user`,
        responseType: "json",
        headers: {
            cookie: req.headers.cookie || "No-Cookie"
        }
    }).then((resp)=>{
        res.redirect("/details")
    })
})


route.get("/signup", (req, res)=>{
    res.render("signup", {
        user: {loggedIn: req.user?true:false},
        data: {signupactive: "active"},
        query: req.query
    })
})
route.post("/signup", (req, res)=>{
    console.log(req.body);
    axios({
        method: "POST",
        data: {user: req.body},
        url: `${req.protocol}://${req.get("host")}/api/signup`,
        responseType: "json"
    }).then((resp)=>{
        if(resp.data.error){
            // res.statusCode = 302
            // req.flash("reg_err", resp.data.error)
            // res.redirect(url.format({
            //     pathname: "/signup",
            //     query: resp.data.user
            // }))
            res.render("signup", {
                user: {loggedIn: req.user?true:false},
                data: {loginactive: "active", apiErr: req.query.apiErr},
                query: resp.data.user,
                error: resp.data.error
            })
        }else{
            req.flash("reg_success", "Account has been successfully Created.. You can  now login")
            res.redirect("/login")
        }
    })
})

route.get("/login", (req, res)=>{
    res.render("login", {
        user: {loggedIn: req.user?true:false},
        data: {loginactive: "active", apiErr: req.query.apiErr}
    })
})

route.post("/login", (req, res, next)=>{
    passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/login",
        successRedirect: "/"
    })(req, res, next)
})

route.get("/logout", (req, res)=>{
    req.logout();
    res.redirect("/")
})

module.exports = route
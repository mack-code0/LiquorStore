const Store = require("../models/storedb")
module.exports = {
    ensureAuthenticated: (req, res, next)=>{
        if(req.isAuthenticated()){
            return next()
        }
        req.flash("reg_err", "Please Login to view this source")
        res.redirect("/login")
    },
    ensureApiAuthenticated: (req, res, next)=>{
        if(req.isAuthenticated()){
            return next()
        }
        req.flash("reg_err", "Please Login to buy products")
        res.json({apiErr: "Please Login"})
    },
    ensureCheckout: (req, res, next)=>{
        // Checks if request is coming from the checkout route
        if(typeof req.session.checkout != "undefined"){
            if(req.session.checkout.state){
                return next()
            }else{
                res.redirect("/cart")
            }
        }else{
            res.redirect("/cart")
        }
    },
    ensureCheckout2: (req, res, next)=>{
        // Checks if products are in the cart
        Store.find({user_id: req.user.id}, (err, cart)=>{
            if(err) throw err 
            if(cart.length<=0){
                res.redirect("/cart")
            }else{   
                return next()
            }
        })
    }
}
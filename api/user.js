const express = require('express');
const route = express.Router()
const bcrypt = require("bcryptjs")
const User = require("../models/users")
const validate = require("../config/userconfig")

route.post("/signup", (req, res)=>{
    const {error, value} = validate(req.body.user)
    if(error){
        res.json({error: error.message.split('"').join(""), user: value})
    }
    else{
        User.findOne({email: value.email}, (err, checkuser)=>{
            if(err) throw err
            if(checkuser){
                res.json({error: "Email is already registered", user: value})
            }else{
                bcrypt.genSalt(10, (err, salt)=>{
                    if(err) throw err
                    bcrypt.hash(value.password, salt, (err, hash)=>{
                        value.password = hash
                        const saveUser = new User(value)
                        saveUser.save({timestamps: true}, (err, user)=>{
                        if(err) throw err
                            res.json(user)
                        })
                    })
                })
            }
        })
    }
})

route.post("/update-user", (req, res)=>{
    console.log("----------------------------------------------------------------------------------");
    console.log(req.body.data);
    User.findOneAndUpdate({_id: req.user.id}, req.body.data, (err, updated)=>{
        if(err) throw err
        res.json(updated)
    })
})


module.exports = route
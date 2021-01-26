const bcrypt = require('bcryptjs');
const User = require("./../models/users")
const passAuth = require("./changePassConfig")
module.exports = (req, res)=>{

    const {error, value} = passAuth(req.body)
    if(error){
        req.flash("reg_err", error.message.split('"').join(""))
        return res.redirect("/password")
    }

    const user_id = req.user._id
    const old_password = req.body.oldpassword
    const new_password = req.body.newpassword
    const sec_new_password = req.body.secondnewpassword

    if(new_password !== sec_new_password){
        req.flash("error", "New passwords does not match")
        return res.redirect("/password")
    }


    User.findOne({_id: user_id}, (err, user)=>{
        if(err) throw err
        bcrypt.compare(old_password, user.password, (err, isMatch)=>{
            if(!isMatch){
                req.flash("error", "Incorrect current password")
                return res.redirect("/password")
            }

            bcrypt.genSalt(10, (err, salt)=>{
                if(err) throw err
                bcrypt.hash(new_password, salt, (err, hash)=>{
                    if(err) throw err
                    User.findByIdAndUpdate({_id: user_id}, {password: hash}, (err, updated)=>{
                        req.flash("reg_success", "Password Changed Successfully")
                        return res.redirect("/password")
                    })
                })
            })
        })
    })
}
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/users")
const bcrypt = require("bcryptjs")

module.exports = (passport)=>{
    passport.use(
        new LocalStrategy({usernameField: "email"}, (email, password, done)=>{
            User.findOne({email: email}, (err, user)=>{
                if(err) throw err
                if(!user){
                    return done(null, false, {message: "Email is not registered"})
                }else{
                    bcrypt.compare(password, user.password, (err, isMatch)=>{
                        if(err) throw err
                        if(!isMatch){
                            return done(null, false, {message: "Incorrect Login details"})
                        }else{

                            return done(null, user)
                        }
                    })
                }
            })
        })
    )
    
    passport.serializeUser((user, done)=>{
        done(null, user.id)
    })

    passport.deserializeUser((id, done)=>{
        User.findById(id, (err, user)=>{
            if(err) throw err
            done(null, user)
        })
    })
}
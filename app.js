const http = require("http")
const express = require("express")
const app = express()
const server = http.createServer(app)
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash")
const mongoose = require("mongoose")
const PORT = process.env.PORT || 4000
const passport = require("passport")
mongoose.connect("mongodb://localhost:27017/liquorstore", {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false})
.then(()=>{
    server.listen(PORT, ()=>{
        console.log(`connected to port ${PORT}`);
    })
})
.catch((err)=>{
    // console.log("An error occured here")
    throw err
})

require("./config/passport")(passport)

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60*30*1000 //30 mins
    }
}))

app.use(flash())


app.use((req, res, next)=>{
    res.locals.reg_err = req.flash("reg_err")
    res.locals.reg_success = req.flash("reg_success")
    res.locals.error = req.flash("error")
    next()
})

app.use("/confirm-order", (req, res, next)=>{
    res.locals.order_num = req.flash("order_num")
    next()
})

app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.use("/api", require("./api/store"))
app.use("/api", require("./api/order"))
app.use("/api", require("./api/user"))
app.use("/", require("./routes/store"))
app.use("/", require("./routes/user"))
app.get("*/*", (req, res)=>{
    res.render("error")
})
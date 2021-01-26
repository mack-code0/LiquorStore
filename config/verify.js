const jwt = require("jsonwebtoken")
module.exports = {
    apiVerify : (req, res, next)=>{
        var rawcookie = req.headers.cookie.split("; ")
        var parsedCookies = {}
        rawcookie.forEach(cookie=>{
            var arr = cookie.split("=")
            parsedCookies[arr[0]] = arr[1]
        })
        let accessToken = parsedCookies.jwt
        if(!accessToken){
            console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLL")
            return res.status(403).send()
        }
        let payload
        try {
            payload = jwt.verify(accessToken, "tokensecret")
            next()
        } catch (error) {
            console.log("____________________")
            return res.status(401).send()
        }
    }
}
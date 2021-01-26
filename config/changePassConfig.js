const joi = require("joi")

const pass = (passFields)=>{
    const configPass = joi.object().keys({
        oldpassword: joi.string().required().messages({"string.empty": "Password field is required"}),
        newpassword: joi.string().required().min(4).messages({"string.empty": "New Password field is required", "string.min": "New Password must be at least 4 characters long"}),
        secondnewpassword: joi.string().required().min(4).messages({"string.empty": "New Password field is required"})
    })

    return configPass.validate(passFields)
}

module.exports = pass
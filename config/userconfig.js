const joi = require("joi")


const validate = (user)=>{
    const userSchema = joi.object().keys({
        firstname: joi.string().required().min(2).messages({"string.empty": "Firstname field is required", "string.min": "Firstname must be at least 2 characters long"}),
        lastname: joi.string().required().min(2).messages({"string.empty": "Lastname field is required", "string.min": "Lastname must be at least 2 characters long"}),
        country: joi.string().required().messages({"string.empty": "Country field is required"}),
        address: joi.string().required().messages({"string.empty": "Address field is required"}),
        city: joi.string().required().min(2).messages({"string.empty": "City field is required", "string.min": "City must be at least 2 characters long"}),
        postcode: joi.string().min(4).required().messages({"string.empty": "Postcode field is required", "string.min": "Postcode must be at least 4 characters long"}),
        phone: joi.string().min(5).required().messages({"string.empty": "Phone field is required", "string.min": "Phone number must be at least 5 characters long"}),
        email: joi.string().email().required().messages({"string.empty": "Email field is required", "string.email": "Email must be a valid email"}),
        password: joi.string().required().min(4).messages({"string.empty": "Password field is required", "string.min": "Password must be at least 4 characters long"}),
        cpassword: joi.string().required().regex(new RegExp(user.password)).messages({"string.empty": "Passwords do not match", "string.regex": "Passwords do not match"}),
        newsletter:joi.string()
    })

    // console.log(userSchema.validate(user));
    return userSchema.validate(user)
}


module.exports = validate
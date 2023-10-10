const mongoose = require('mongoose')
const Joi = require('joi');
//User Schema
const userschema = mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true }


    }
)
module.exports = mongoose.model('User', userschema)
//---------------------------------------------------------------\\
//validates user schema
function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(6).max(35).required(),
        password: Joi.string().min(6).max(35).required(),
        firstName: Joi.string().min(3).max(55).required(),

    });
    return schema.validate(user);
}
module.exports.validateUser = validateUser;
//---------------------------End of file------------------------------------\\

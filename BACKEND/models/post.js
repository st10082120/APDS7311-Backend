const mongoose = require('mongoose')
const Joi = require('joi');
//---------------------------------------------------------------\\
//Board Schema
const boardschema = mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        departmentCode: { type: String, required: true }

    }
)
module.exports = mongoose.model('Post', boardschema)
const Post = mongoose.model('Post', boardschema);
//---------------------------------------------------------------\\
//Checks board validation
function validatePost(post) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(30).required(),
        description: Joi.string().min(3).max(50).required(),
        departmentCode: Joi.string().min(3).max(50).required()

    });
    return schema.validate(post);
}
module.exports.Post = Post;
module.exports.validatePost = validatePost;
//---------------------------End of file------------------------------------\\

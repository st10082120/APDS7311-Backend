const express = require('express')
const router = express.Router();
const { validateUser, userschema } = require('../models/user');
//const validateUser = require('../models/user');
const { hashPassword } = require('../utils/hash');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
//const { router } = require('./users');
const User = mongoose.model('User', userschema);

//---------------------------------------------------------------\\
//create user
router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const existingUser = await User.findOne({ $or: [{ username: req.body.username }, { password: req.body.email }, { firstName: req.body.firstName }] });
    if (existingUser) {
        return res.status(400).json({ error: 'The Username/Email is already taken' });
    }

    try {
        const user = new User(req.body);
        user.Password = await hashPassword(user.password);
        await user.save();
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
    res.sendStatus(201);

});
//---------------------------------------------------------------\\
//get current user details 
router.get('/', auth, async (req, res) => {
    res.send({ currentUser: req.user });
});
//---------------------------------------------------------------\\
/*module.exports = {
    router: router,
    User: mongoose.model('User', userschema)
};*/
module.exports = router;
//module.exports = mongoose.model('User', userschema);
//---------------------------End of file------------------------------------\\

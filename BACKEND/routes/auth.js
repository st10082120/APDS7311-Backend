const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { userschema } = require('../models/user');
const { hashPassword, isValidPassword } = require('../utils/hash');
const mongoose = require('mongoose');
const User = mongoose.model('User', userschema);
const ExpressBrute = require('express-brute');
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);
//const bcrypt = require('bcrypt');
//---------------------------------------------------------------\\
//login route
router.post('/', bruteforce.prevent, async (req, res) => {
    try {
        console.log('Received signin request:', req.body);

        const user = await User.findOne({ username: req.body.username }).lean();
        if (!user)
            return res.status(401).json({ error: 'Incorrect username or password' });

        const valid = await isValidPassword(req.body.password, user.password);
        if (!valid)
            return res.status(401).json({ error: 'Incorrect username or password' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
        res.send({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred during login' });
    }
});

module.exports = router;
//---------------------------End of file------------------------------------\\
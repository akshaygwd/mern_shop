const express = require('express');
const router = express.Router();
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Item Model
const User = require('../../models/User');

//@route GET api/items
router.post('/', (req, res, next) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password ) {
        return res.status(400).json({
            message: 'Please enter all fields'
        })
    }

    User.findOne({email: email})
    .then((user) => {
        if(user) {
            return res.status(400).json({
                message: 'User already exists'
            })
        }

        const newUser = new User({
            name,
            email,
            password
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) {
                    throw err
                }
                newUser.password = hash;
                newUser.save()
                .then((user) => {
                    jwt.sign(
                        { id: user.id },
                        "secret",
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw erro;
                            res.json({
                                token: token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email
                                }
                        })
                    })
                })
            })
        })
    })
})




module.exports = router;
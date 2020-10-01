const express = require('express');
const router = express.Router();
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Item Model
const User = require('../../models/User');

//@route GET api/items
router.post('/', (req, res, next) => {
    const {email, password} = req.body;
    console.log(email, password);

    if(!email || !password ) {
        return res.status(400).json({
            message: 'Please enter all fields'
        })
    }

    User.findOne({email: email})
    .then((user) => {
        if(!user) {
            return res.status(400).json({
                message: 'User does not exists'
            })
        }

        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(!isMatch) {
                return res.status(400).json({
                    message: 'invlaid cred'
                })
            }
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


router.get('/user', auth, (req, res) => {
    console.log(req.user, 'hit user');
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
})



module.exports = router;
const jwt = require('jsonwebtoken');

function  auth(req, res, next) {
    const token = req.header('x-auth-token');
    console.log(token, 'token');

    if(!token) {
       return  res.status(401).json({
            message: "not authorised"
        })
    }

    try {
        const decode = jwt.verify(token, 'secret');

        req.user = decode;
        next();
    }
    catch(e) {
        return res.status(400).json({
            message: "not vlid token"
        })
    }
}

module.exports = auth;
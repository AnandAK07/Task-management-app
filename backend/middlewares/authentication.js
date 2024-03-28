const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    const decoded = req.headers.authorization;
    const token = decoded.split(' ')[1];
    jwt.verify(token, process.env.SECREATE_KEY, function (err, decoded) {
        if (err) {
            return res.status(400).send('Token may be expired')
        }
        req.body.userId = decoded.userId;
    });
    next();
}

module.exports = authentication;
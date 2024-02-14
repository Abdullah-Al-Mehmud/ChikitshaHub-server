const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'unauthorize access' })
    }
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return res.status(401).send({ message: 'unauthorize access' })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'forbidden access' })
        } else {
            req.decoded = decoded;
            next();
        }
    })
};

module.exports = {
    verifyToken
};
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // console.log(req.cookies?.token)
    const token = req?.cookies?.token;
  if (!token) {
      return res.status(401).send({ message: 'unauthorized access' })
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
          return res.status(401).send({ message: 'unauthorized access' })
      }
      req.decoded = decoded;
      next();
  })
};

module.exports = {
    verifyToken
};
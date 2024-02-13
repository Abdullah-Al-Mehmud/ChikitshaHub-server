const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const jwtSchema = require("../Schema/JwtSchema");

const Jwt = new mongoose.model("Jwt", jwtSchema);

router.post('/', async (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60 });

    // console.log('token:', token)gti

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    })
        .send({ success: true });
});


module.exports = router;
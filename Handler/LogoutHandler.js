const express = require("express");
const router = express.Router();

router.post('/', async (req, res) => {
    const user = req.body;
    console.log('logging out', user);
    res.clearCookie('token', { maxAge: 0 }).send({ success: true })
})


module.exports = router;
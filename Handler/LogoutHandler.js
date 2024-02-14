const express = require("express");
const router = express.Router();

router.post('/', async (req, res) => {
    const user = req.body;
    res.clearCookie('token', { maxAge: 0 }).send({ success: true })
})


module.exports = router;
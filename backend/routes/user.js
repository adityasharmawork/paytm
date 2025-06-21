const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post("/signup", async (req, res) => {
    const { username, firstName, lastName, password } = req.body;
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ username }, secret);
    res.json({
        message: "User created successfully!",
        token
    });
});

module.exports = router;
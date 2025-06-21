const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const SECRET = require('../config');

router.post("/signup", async (req, res) => {
    const { username, firstName, lastName, password } = req.body;
    const token = jwt.sign({ username }, SECRET);
    res.json({
        message: "User created successfully!",
        token
    });
});

module.exports = router;
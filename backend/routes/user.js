const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const zod = require('zod');
const SECRET = require('../config');

const signupBody = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

router.post("/signup", async (req, res) => {
    const { username, firstName, lastName, password } = req.body;
    const token = jwt.sign({ username }, SECRET);
    res.json({
        message: "User created successfully!",
        token
    });
});

module.exports = router;
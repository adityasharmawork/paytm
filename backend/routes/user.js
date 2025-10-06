const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const zod = require('zod');
const { SECRET } = require('../config')
const { User, Account } = require('../db');

const { authMiddleware } = require("../middleware");

const signupBody = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

const signinBody = zod.object({
    username: zod.string(),
    password: zod.string()
});

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
    const { username, firstName, lastName, password } = req.body;
    const { success } = signupBody.safeParse(req.body);
    
    if(!success) {
        return res.status(411).json({
            message: "Incorrect data"
        });
    }

    const existingUser = await User.findOne({ username });

    if(existingUser) {
        return res.status(411).json({
            message: "Username already exists"
        });
    }

    const newUser = await User.create({
        username,
        password,
        firstName,
        lastName
    });

    const userId = newUser._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    });
    
    const token = jwt.sign({ userId }, SECRET);
    
    res.json({
        message: "User created successfully!",
        token
    });
});

router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    
    const { success } = signinBody.safeParse(req.body);

    if(!success) {
        return res.status(411).json({
            message: "Error while logging in"
        });
    }

    const existingUser = await User.findOne({ username, password });

    if(!existingUser) {
        return res.status(411).json({
            message: "Error while logging in"
        });
    }

    const token = jwt.sign({ userId: existingUser._id }, SECRET);

    return res.json({
        token
    });
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: {
                $regex: filter
            }
        }, {
            lastName: {
                $regex: filter
            }
        }]
    });

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });

});

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);

    if(!success) {
        return res.status(411).json({
            message: "Error while updating information",
        });
    }

    await User.updateOne({_id: req.userId}, req.body);

    return res.json({
        message: "Updated Successfully!",
    });
});


module.exports = router;
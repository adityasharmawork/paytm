const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {

    const account = await Account.findOne({
        userId: req.userId
    });

    return res.json({
        balance: account.balance
    });
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const {to, amount} = req.body;

    const account = Account.findOne({
        userId : req.userId
    });

    if(amount > account.balance) {
        return res.status(400).json({
            message: "Insufficient Balance"
        });
    }
})

module.exports = router;
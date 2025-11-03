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

    const toAccount = Account.findOne({
        userId: to
    });

    if(!toAccount) {
        return res.status(400).json({
            message: "Invalid Account"
        });
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance : -amount
        }
    });

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance : amount
        }
    });

    return res.json({
        message: "Transfer successful"
    });

});

module.exports = router;
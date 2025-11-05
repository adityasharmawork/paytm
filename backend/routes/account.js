const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {

    const account = await Account.findOne({
        userId: req.userId
    });

    return res.json({
        balance: account.balance
    });
});

// router.post("/transfer", authMiddleware, async (req, res) => {

//     const {to, amount} = req.body;

//     const account = Account.findOne({
//         userId : req.userId
//     });

//     if(amount > account.balance) {
//         return res.status(400).json({
//             message: "Insufficient Balance"
//         });
//     }

//     const toAccount = Account.findOne({
//         userId: to
//     });

//     if(!toAccount) {
//         return res.status(400).json({
//             message: "Invalid Account"
//         });
//     }

//     await Account.updateOne({
//         userId: req.userId
//     }, {
//         $inc: {
//             balance : -amount
//         }
//     });

//     await Account.updateOne({
//         userId: to
//     }, {
//         $inc: {
//             balance : amount
//         }
//     });

//     return res.json({
//         message: "Transfer successful"
//     });

// });


// Better Implementation (Using Transactions in Databases)

router.post("/transfer", authMiddleware, async (req, res) => {
    
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const {to, amount} = req.body;

        if (amount <= 0) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Transfer amount must be positive"
            });
        }

        const account = await Account.findOne({
            userId: req.userId
        }).session(session);

        if(!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({userId : to}).session(session);

        if(!toAccount) {
            session.abortTransaction();
            return res.status(400).json({
                message: "Invalid Account"
            });
        }

        await Account.updateOne({userId : req.userId}, {$inc : {balance : -amount}}).session(session);
        await Account.updateOne({userId : to}, {$inc : {balance : amount}}).session(session);

        await session.commitTransaction();

        return res.json({
            message: "Transfer Successful"
        });
    } catch (error) {
        // If any error occurs, abort the transaction
        await session.abortTransaction();
        console.error("Transfer failed:", error); // Log the error
        return res.status(500).json({
            message: "Transfer failed, please try again later."
        });

    } finally {
        // Always end the session
        session.endSession();
    }

})

module.exports = router;
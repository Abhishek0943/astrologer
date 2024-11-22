const mongoose = require("mongoose");
const ChatSchema = new mongoose.Schema(
    {
        display: Number,
        price: Number,
        coin: Number,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)
module.exports = mongoose.model("rechargeOffer", ChatSchema);
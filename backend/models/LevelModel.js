const mongoose = require("mongoose");
const ChatSchema = new mongoose.Schema(
    {
        level: Number,
        price: Number,
        coin: Number,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)
module.exports = mongoose.model("level", ChatSchema);
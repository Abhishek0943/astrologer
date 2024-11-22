const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
        },
        content: { type: String, trim: true },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "chat"
        },
        session: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Session"
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
)
module.exports = mongoose.model("Message", MessageSchema);
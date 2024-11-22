const mongoose = require("mongoose");
const ChatSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        dateOfBirth: String,
        message: [
            {
                text: String,
                createdAt: {
                    type: Date,
                    default: Date.now,
                }
            }
        ],
        verify: {
            type: Boolean,
            default: false,
        },
        otp: String,
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
)
module.exports = mongoose.model("lead", ChatSchema);
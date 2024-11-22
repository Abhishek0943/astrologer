const mongoose = require("mongoose");
const ChatSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        astro: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Astro"
        },
        gift: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "gift"
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
)
module.exports = mongoose.model("astroGift", ChatSchema);
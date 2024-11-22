const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    astro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Astro"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isReplied: {
        type: Boolean,
        default: false,
    },
    messages: [
        {
            sender: String,
            content: { type: String, trim: true },
            createdAt: {
                type: Date,
                default: Date.now,
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    }

})
module.exports = mongoose.model("OfflineChat", categorySchema);

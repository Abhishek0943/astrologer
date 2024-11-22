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
    isOpen: {
        type: Boolean,
        default: true
    },
    endAt: Date,
    review: {
        rating: Number,
        comment: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongoose.model("Session", categorySchema);

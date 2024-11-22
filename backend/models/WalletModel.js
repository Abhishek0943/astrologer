const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    astro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Astro"
    },
    amount: Number,
    from: String,
    add: Boolean,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongoose.model("AstroWallet", categorySchema);

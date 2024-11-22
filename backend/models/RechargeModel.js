const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    amount: Number,
    from: String,
    add: Boolean,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongoose.model("Wallet", categorySchema);

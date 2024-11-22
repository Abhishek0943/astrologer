const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
    address: String,
    country: String,
    accountName: String,
    IFSCCode: String,
    nameOfAccount: String,
    paypalId: String,
    astro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Astro"
    },
    idProof: {
        public_id: String,
        url: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongoose.model("bank", CategorySchema);

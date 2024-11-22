const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name: String,
    direction: String,
    keyMeaning: String,
    general: String,
    love: String,
    career: String,
    health: String,
    img: {
        url: String,
        publicId: String,
    }
},{ timestamps: true})
module.exports = mongoose.model("Tarot", categorySchema)
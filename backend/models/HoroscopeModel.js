const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name: String,
    general: String,
    love: String,
    career: String,
    health: String,
    money: String

}, { timestamps: true })
module.exports = mongoose.model("Horoscope", categorySchema)
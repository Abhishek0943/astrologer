const mongoose = require("mongoose");
const ChatSchema = new mongoose.Schema(
    {
        name: String,
        price: String,
        img: {
            url: String,
            public_id: String,
        }
    }
)
module.exports = mongoose.model("gift", ChatSchema);
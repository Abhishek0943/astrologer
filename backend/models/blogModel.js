const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
    title: String,
    blog: String,
    category: [],
    createdBy: String,
    banner: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongoose.model("Blog", blogSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const astroSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    number: String,
    username: String,
    otp: {
        type: String,
        select: false,
    },
    isVerified: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    step: {
        type: Number,
        default: 1
    },
    chat: {
        chatId: String,
        sessionId: String,
        userId: String
    },
    category: [],
    specialty: [],
    language: [],
    experience: String,
    country: String,
    about: String,








    avatar: {
        url: String,
        public_id: String
    },


    createdAt: {
        type: Date,
        default: Date.now,
    },
})
astroSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

astroSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};


astroSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model("Astro", astroSchema);

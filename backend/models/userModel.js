const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
  },
  preference: [],
  isOnline: {
    type: Boolean,
    default: false
  },
  verify: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    select: false,
  },
  dob: String,
  zodiac: String,
  otp: {
    type: Number,
    select: false
  },
  chat: {
    chatId: String,
    sessionId: String,
    astroId: String
  },
  balance: {
    type: Number,
    default: 0,
  },
  loginToken: String,
  strick: Number,
  collectDate: Date,
  avatar: {
    public_id: {
      type: String,
      default: "avatar/qrha3atky0s6dgdalcqs"
    },
    url: {
      type: String,
      default: "https://res.cloudinary.com/daufn0xzj/image/upload/v1673085445/avatar/qrha3atky0s6dgdalcqs.png"
    },
  },
  bt: String,
  bp: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tarotDate: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


userSchema.index({ name: "text", profession: "text" });
module.exports = mongoose.model("User", userSchema);

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const jwt = require('jsonwebtoken');
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorhander.js");
const bcrypt = require("bcryptjs");
const Landing = require("../models/landingModel.js")
// const client = require("../redis/Client.js");
const Recharge = require('../models/RechargeModel.js');

exports.allUserGet = catchAsyncErrors(async (req, res) => {
    const users = await User.find()
    res.status(200).json({ success: true, users })
})

// user auth 
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, password, email, dob, zodiac, bt, bp } = req.body;
    const a = await User.findOne({ email })
    if (a) {
        return next(new ErrorHandler('this email is already used', 400))
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    const exUse = await User.create({ email: email, name, zodiac, password, dob, bp, bt, otp })
    console.warn("add Unique email and unverify filter")
    const token = exUse.getJWTToken();
    res.status(200).json({ success: true, user:exUse, token })
})


exports.verifyUser = catchAsyncErrors(async (req, res, next) => {
    const { otp, email } = req.body
    let user = await User.findOne({ email: email }).select("+otp")
    if (!user) {
        return next(new ErrorHandler('You broke some flow so please restart your registration or try with another email', 400))
    }
    if (user.otp === 0) {
        return next(new ErrorHandler('This otp already used so restart your registrations process', 400))
    }
    if (user.otp !== Number(otp)) {
        user.otp = 0
        user.save()
        return next(new ErrorHandler('You enter wrong email please enter correct otp', 400))

    }
    user.verify = true
    user.otp = 0
    user.save()
    const a = user.getJWTToken()
    res.status(200).json({
        user, success: true, token: a
    })
})
exports.reSendEmail = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body
    let user = await User.findOne({ email: email })
    if (!user) {
        return next(new ErrorHandler("We don't have this email data please restart  the registration process", 400))
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    user.otp = otp
    user.save()
    res.status(200).json({
        success: true,
    })
})
exports.login = catchAsyncErrors(async (req, res) => {
    try {
        const { c, p } = req.body
        let user = await User.findOne({ email: c }).select("+password")
        if (!user) {
            throw new ErrorHandler("Invalid email", 401)
        }
        const isPasswordMatched = await user.comparePassword(p);
        if (!isPasswordMatched) {
            throw new ErrorHandler("Invalid  password", 401)
        }
        const token = user.getJWTToken();
        user.loginToken = token;
        user.save()
        res.status(200).json({
            success: true,
            user,
            token
        })
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, error, message: error.message })
    }

})
exports.dailyReward = catchAsyncErrors(async (req, res) => {
    try {
        const { id, strick } = req.query
        let user = await User.findOne({ _id: id })
        if (!user) {
            throw new ErrorHandler("Invalid user", 401)
        }
        await Recharge.create({ user: user._id, amount: strick == 7 ? 2 : 1, from: "Daily Reward", add: true })
        user.strick = strick == 7 ? 0 : Number(strick)
        user.balance = user.balance + (strick == 7 ? 2 : 1)
        user.collectDate = new Date()
        await user.save()
        res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, error, message: error.message })
    }

})
exports.tokenLogin = catchAsyncErrors(async (req, res) => {
    const token = req.body.token
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
        throw new ErrorHandler("Session is Expired", 401)
    }
    const user = await User.findById(verifyToken.id)
    if (!user?.verify) {
        throw new ErrorHandler("Session is Expired", 401)
    }
    if (user.loginToken !== token) {
        throw new ErrorHandle("Your account login in other device", 400)

    }
    res.status(200).json({
        success: true,
        user,
    })
})
exports.forgotPassword = catchAsyncErrors(async (req, res) => {
    const { c, p, t } = req.body
    if (!t) {
        let user = await User.findOne({ email: c });
        if (!user) {
            throw new ErrorHandler(`User not exist Please check your Email`, 400)
        }
        const token = user.getJWTToken()
        const html = `<a  href="http://localhost:3000/auth?forgot-password=true&token=${token}" > Click Here</a>`
        console.log(html)
        sendEmail({
            email: c,
            subject: "Forgot password",
            html
        })
    }
    else {
        const verifyToken = jwt.verify(t, process.env.JWT_SECRET);
        if (!verifyToken) {
            throw new ErrorHandler("Session is Expired", 401)
        }
        let user = await User.findById(verifyToken.id)
        user.password = p
        await user.save()
    }
    res.status(200).json({
        success: true,
    })
})
exports.taro = catchAsyncErrors(async (req, res) => {
    const { id } = req.body
    const date = new Date()
    user = await User.findOneAndUpdate({ _id: id }, { taro: date }, { new: true });
    res.status(200).json({
        success: true,
        user
    })
})
exports.changePassword = catchAsyncErrors(async (req, res) => {
    const { password, id } = req.body
    const user = await User.findOne({ _id: id })
    user.password = password
    await user.save()
    res.status(200).json({
        success: true,
        user
    })
})
exports.general = catchAsyncErrors(async (req, res) => {
    const { id, ...update } = req.body
    user = await User.findOneAndUpdate({ _id: id }, { ...update }, { new: true });
    res.status(200).json({
        success: true,
        user
    })
})
exports.resetPassword = catchAsyncErrors(async (req, res) => {
    const { password, token } = req.body
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
    if (!verifyToken) {
        throw new ErrorHandler("Link expired Try again", 401)
    }
    const user = await User.findOne({ _id: verifyToken.id })
    user.password = password
    await user.save()
    res.status(200).json({
        user, success: true
    })
})
exports.Search = catchAsyncErrors(async (req, res) => {
    const { q } = req.body
    const astrologers = await User.find({
        $and: [
            { $text: { $search: q } },
            { astrologer: "approved" }
        ]
    })
    // .find({ _id: { $ne: _id } })
    res.status(200).json({
        success: true,
        astrologers,
    })

})
exports.weekly = catchAsyncErrors(async (req, res) => {
    const { id } = req.body
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const daysUntilNextSaturday = 6 - currentDayOfWeek;
    const nextSaturday = new Date(today);
    nextSaturday.setDate(today.getDate() + daysUntilNextSaturday);
    const a = await User.findByIdAndUpdate({ _id: id }, {
        $set: { week: nextSaturday }, // Set the new value for the week field
        $inc: { balance: -8 } // Subtract amountToSubtract from the balance field
    }, { new: true })
    res.status(200).json({ success: true, user: a })

})
exports.monthly = catchAsyncErrors(async (req, res) => {
    const { id } = req.body
    const today = new Date();
    const a = await User.findByIdAndUpdate({ _id: id }, { $set: { month: today.getMonth() + 1 }, $inc: { balance: -16 } }, { new: true })
    res.status(200).json({ success: true, user: a })


})
exports.yearly = catchAsyncErrors(async (req, res) => {
    const { id } = req.body
    const today = new Date();
    const a = await User.findByIdAndUpdate({ _id: id }, { $set: { year: today.getFullYear() }, $inc: { balance: -27 } }, { new: true })
    res.status(200).json({ success: true, user: a })
})

exports.ApplyForAstro = catchAsyncErrors(async (req, res) => {
    const { id, ...r } = req.body
    const s = await User.findOneAndUpdate({ _id: id }, { astrologer: "applied", ...r }, { new: true })
    res.status(200).json({
        success: true,
        user: s,
    })
})
exports.AcceptAstroRequest = catchAsyncErrors(async (req, res) => {
    const { id } = req.body
    const s = await User.findOneAndUpdate({ _id: id }, { astrologer: "approved" }, { new: true })
    const a = await User.find({ astrologer: "applied" })
    res.status(200).json({
        success: true,
        astrologer: s,
        astrologerRequest: a,
    })
})
exports.RejectAstroRequest = catchAsyncErrors(async (req, res) => {
    const { id } = req.body
    const s = await User.findOneAndUpdate({ _id: id }, { astrologer: "rejected" }, { new: true })
    const a = await User.find({ astrologer: "applied" })
    res.status(200).json({
        success: true,
        astrologer: s,
        astrologerRequest: a,
    })
})
exports.GetAstrologerRequest = catchAsyncErrors(async (req, res) => {
    const a = await User.find({ astrologer: "applied" })
    res.status(200).json({
        success: true,
        astrologerRequest: a,
    })
})
exports.GetAstrologers = catchAsyncErrors(async (req, res) => {
    const a = await User.find({ astrologer: "approved" })
    res.status(200).json({
        success: true,
        astrologers: a,
    })
})

exports.GetAstrologer = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    const Astrologer = await User.findOne({ _id: id }).select("-password")
    res.status(200).json({ astrologer: Astrologer, success: true })
})
exports.Update = catchAsyncErrors(async (req, res, next) => {
    const { name, dob, zodiac, country, profile, id } = req.body
    const u = {}
    if (name) u.name = name
    if (dob) u.dob = dob
    if (country) u.country = country
    if (zodiac) u.zodiac = zodiac
    if (profile) {
        let a = await cloudinary.v2.uploader.upload(profile, { folder: "avatar", })
        u.avatar = {
            public_id: a.public_id,
            url: a.secure_url
        }
    }
    const user = await User.findOneAndUpdate({ _id: id }, { ...u }, { new: true })
    res.status(200).json({
        success: true,
        user,
    })
})






















// landing page handel functions 
exports.emailLogin = catchAsyncErrors(async (req, res) => {
    const { email, name, dateOfBirth, message } = req.body;
    const a = await Landing.findOne({ email })
    const otp = Math.floor(1000 + Math.random() * 9000);
    if (a) {
        a.message.push({ text: message })
        a.otp = otp.toString()
        a.save()
    }
    else {
        await Landing.create({ email, name, dateOfBirth, message: [{ text: message }], otp: otp.toString() })
    }
    res.status(200).json({ success: true })
})
exports.landingForm = catchAsyncErrors(async (req, res) => {
    const { otp, email } = req.body;
    const a = await Landing.findOne({ email })
    if (a.otp === otp.toString()) {
        a.verify = true;
        a.save()
        res.status(200).json({ success: true })
    }
    else {
        throw new ErrorHandler("You enter Wrong Otp", 400)
    }
})
exports.landingGet = catchAsyncErrors(async (req, res) => {
    const a = await Landing.find()
    console.log(a)
    res.status(200).json({ success: true, landingUsers: a })
})
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");

const ErrorHandler = require("../utils/errorhander.js");
exports.addUser = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;
    const e = await admin.findOne({ email })
    if (e) return next(new ErrorHandler("this email is already exist", 404));
    const user = await admin.create(req.body)
    const adminUser = await admin.findOne({ _id: user._id }).select("-__v").populate("role", "-__v")
    res.json({
        success: true,
        adminUser
    })
});
exports.login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, } = req.body;
    const adminUser = await admin.findOne({ email }).select("+password")
    if (!adminUser) return next(new ErrorHandler("Invalid name or password", 401));
    const isPasswordMatched = await adminUser.comparePassword(password);
    if (!isPasswordMatched) return next(new ErrorHandler("Invalid name or password", 401));
    res.json({
        success: true,
        adminUser
    })
});
exports.adminAccounts = catchAsyncErrors(async (req, res, next) => {
    const adminUsers = await admin.find().select("-__v").populate("role")
    res.json({
        success: true,
        adminUsers
    })
});
exports.updateAccounts = catchAsyncErrors(async (req, res, next) => {
    const { userId, role, email, number, name, password } = req.body
    let u = {}
    if (role) u.role = role
    if (email) u.email = email
    if (name) u.name = name
    if (number) u.number = number
    if (password) {
        const nPassword = await bcrypt.hash(password, 10);
        u.password = nPassword
    }
    await admin.findByIdAndUpdate({ _id: userId }, { ...u }, { new: true })
    const adminUsers = await admin.find().select("-__v").populate("role", "-__v")
    res.json({
        success: true,
        adminUsers
    })
});
exports.deleteAccount = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    await admin.findByIdAndDelete({ _id: id })
    const adminUsers = await admin.find().select("-__v").populate("role", "-__v")
    res.json({
        success: true,
        adminUsers
    })
});

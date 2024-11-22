const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Bank = require("../models/bankModel");
const Astro = require("../models/astroModel.js");
const ErrorHandler = require("../utils/errorhander.js");
exports.addBank = catchAsyncErrors(async (req, res) => {
    const { id, amount } = req.body
    const a = await Astro.findOne({ _id: id })
    a.balance = a.balance - Number(amount)
    const b = await Bank.create({ id, amount, balance: a.balance })
    console.log(b)
    res.status(200).json({ success: true })
})
exports.bankAccount = catchAsyncErrors(async (req, res) => {
    const { id } = req.query
    const banks = await Bank.find({ id })
    res.status(200).json({ success: true, invoice: banks })
})

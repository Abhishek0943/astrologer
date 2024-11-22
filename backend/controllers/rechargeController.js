const Recharge = require('../models/RechargeModel.js');
const User = require('../models/userModel.js');
exports.addRecharge = async (req, res) => {
    const { userID, amount } = req.body
    const user = await User.findOne({ _id: userID })
    user.balance = user.balance + Number(amount)
    await Recharge.create({ user: userID, amount, from: "Recharge", add: true })
    user.save()
    res.status(200).json({ success: true, user })
}
exports.getRechargeHistory = async (req, res) => {
    const { id } = req.query
    const rechargeHistory = await Recharge.find({ user: id })
    res.status(200).json({ success: true, rechargeHistory })
}
exports.getAllRechargeHistory = async (req, res) => {
    const rechargeHistory = await Recharge.find().populate("user")

    res.status(200).json({ success: true, rechargeHistory })
}

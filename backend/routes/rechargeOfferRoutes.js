const express = require("express");
const router = express.Router();
const RechargeOffer = require("../models/RechargeOfferModel.js")
router.route("/rechargeOffer").post(async (req, res) => {
    const { display, price, coin } = req.body
    await RechargeOffer.create({ display: Number(display), price: Number(price), coin: Number(coin) })
    const rechargeOffer = await RechargeOffer.find()
    res.status(200).json({ success: true, rechargeOffer })
}).get(async (req, res) => {
    const rechargeOffer = await RechargeOffer.find()
    res.status(200).json({ success: true, rechargeOffer })
}).put(async (req, res) => {
    const { id, ...body } = req.body
    await RechargeOffer.findOneAndUpdate({ _id: id }, body)
    const rechargeOffer = await RechargeOffer.find()
    res.status(200).json({ success: true, rechargeOffer })
}).delete(async (req, res) => {
    const { id } = req.query;
    await RechargeOffer.findOneAndDelete({ _id: id })
    const rechargeOffer = await RechargeOffer.find()
    res.status(200).json({ success: true, rechargeOffer })
})

module.exports = router;
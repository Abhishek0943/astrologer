const express = require("express");
const router = express.Router();
const Gift = require("../models/GiftModel.js")
const cloudinary = require("cloudinary")
router.route("/gift").post(async (req, res) => {
    const { name, price, img } = req.body
    let a = await cloudinary.v2.uploader.upload(img, { folder: "gift", })
    await Gift.create({ name, price, img: {
        public_id: a.public_id,
        url: a.secure_url
    } })
    const gift = await Gift.find()
    res.status(200).json({ success: true, gift })
}).get(async (req, res) => {
    const gift = await Gift.find()
    res.status(200).json({ success: true, gift })
}).put(async (req, res) => {
    const { id, ...body } = req.body
    await Gift.findOneAndUpdate({ _id: id }, body)
    const gift = await Gift.find()
    res.status(200).json({ success: true, gift })
}).delete(async (req, res) => {
    const { id } = req.query;
    await Gift.findOneAndDelete({ _id: id })
    const gift = await Gift.find()
    res.status(200).json({ success: true, gift })
})

module.exports = router;
const express = require("express");
const router = express.Router();
const Gift = require("../models/AstroGiftModel.js")
const cloudinary = require("cloudinary")
router.route("/astroGift").post(async (req, res) => {
    const { user, astro, gift } = req.body
    console.log(req.body)
    res.status(200).json({ success: true })
}).get(async (req, res) => {
    const gift = await Gift.find()
    res.status(200).json({ success: true, gift })
})

module.exports = router;
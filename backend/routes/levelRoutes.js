const express = require("express");
const router = express.Router();
const Level = require("../models/LevelModel")
router.route("/level").post(async (req, res) => {
    const { level, price, coin } = req.body
    console.log(req.body)
    await Level.create({ level:Number(level), price: Number(price), coin })
    const levels = await Level.find()
    res.status(200).json({ success: true, level: levels })
}).get(async (req, res) => {
    const level = await Level.find()
    res.status(200).json({ success: true, level })
}).put(async (req, res) => {
    const { id, ...body } = req.body
    await Level.findOneAndUpdate({ _id: id }, body)
    const level = await Level.find()
    res.status(200).json({ success: true, level })
}).delete(async (req, res) => {
    const { id } = req.query;
    await Level.findOneAndDelete({ _id: id })
    const level = await Level.find()
    res.status(200).json({ success: true, level })
})

module.exports = router;
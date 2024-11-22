const Tarot = require('../models/TarotModel.js');
const User = require('../models/userModel.js');
const Astro = require('../models/astroModel.js');
const OfflineChat = require('../models/OfflineChat.js');
const cloudinary = require('cloudinary');

exports.addTarot = async (req, res) => {
    const { img, name, direction, keyMeaning, general, love, career, health } = req.body
    let a = await cloudinary.v2.uploader.upload(img, { folder: "avatar", })
    await Tarot.create({ name, direction, keyMeaning, general, love, career, health, img: { url: a.secure_url, publicId: a.public_id } })
    const tarots = await Tarot.find()
    res.status(200).json({ success: true, tarots })
}

exports.getTarot = async (req, res) => {
    const tarots = await Tarot.find()
    res.status(200).json({ success: true, tarots })
}

exports.updateTarot = async (req, res) => {
    const { id } = req.params
    const { img, ...up } = req.body
    if (img) {
        const u = await Tarot.findOne({ _id: id })
        let a = await cloudinary.v2.uploader.upload(img, { folder: "avatar", })
        u.img = {
            publicId: a.public_id,
            url: a.secure_url
        }
        await u.save()
    }
    const tarot = await Tarot.findByIdAndUpdate({ _id: id }, up, { new: true })
    res.status(200).json({ success: true, tarot })
}

exports.deleteTarot = async (req, res) => {
    const { id } = req.query
    await Tarot.findByIdAndDelete({ _id: id })
    res.status(200).json({ success: true })
}

exports.Tarot = async (req, res) => {
    const { id } = req.params
    console.log("this is id", id)
    const user = await User.findOne({ _id: id })
    user.tarotDate = new Date()
    await user.save()
    const tarots = await Tarot.find()
    const a = Math.floor(Math.random() * (tarots.length - 0 + 1)) + 0;
    const tarot = tarots[a]
    res.status(200).json({ success: true, tarot, user })
}


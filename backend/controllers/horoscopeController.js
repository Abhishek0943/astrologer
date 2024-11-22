const Horoscope = require('../models/HoroscopeModel.js');
const User = require('../models/userModel.js');
const Astro = require('../models/astroModel.js');
const OfflineChat = require('../models/OfflineChat.js');
const cloudinary = require('cloudinary');

exports.addHoroscope = async (req, res) => {
    const { name, general, love, career, health, money } = req.body
    await Horoscope.create({ name, general, love, career, health, money })
    const horoscopes = await Horoscope.find()
    res.status(200).json({ success: true, horoscopes })
}

exports.getHoroscope = async (req, res) => {
    const horoscopes = await Horoscope.find()
    res.status(200).json({ success: true, horoscopes })
}

exports.updateHoroscope = async (req, res) => {
    const { id } = req.params
    const { ...up } = req.body
    const horoscope = await Horoscope.findByIdAndUpdate({ _id: id }, up, { new: true })
    res.status(200).json({ success: true, horoscope })
}

exports.deleteHoroscope = async (req, res) => {
    const { id } = req.query
    await Horoscope.findByIdAndDelete({ _id: id })
    res.status(200).json({ success: true })
}

exports.Horoscope = async (req, res) => {
    const { id } = req.params
    const horoscope = await Horoscope.findOne({ _id: id })
    res.status(200).json({ success: true, horoscope })
}
exports.MyHoroscope = async (req, res) => {
    const { q } = req.query
    const horoscope = await Horoscope.findOne({ name: q })
    res.status(200).json({ success: true, horoscope })

}


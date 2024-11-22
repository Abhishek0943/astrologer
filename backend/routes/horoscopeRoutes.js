const express = require("express");
const {
    getHoroscope, addHoroscope,  Horoscope, deleteHoroscope, updateHoroscope, MyHoroscope
} = require("../controllers/horoscopeController.js")
const router = express.Router()
router.route("/horoscope").get(getHoroscope).post(addHoroscope).delete(deleteHoroscope);
router.route("/horoscope/:id").get(Horoscope).put(updateHoroscope)
router.route("/my-horoscope").get(MyHoroscope)
module.exports = router;

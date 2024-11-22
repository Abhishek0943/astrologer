const express = require("express");
const {
    getTarot, addTarot,  Tarot, deleteTarot, updateTarot
} = require("../controllers/tarotController.js")
const router = express.Router()
router.route("/tarot").get(getTarot).post(addTarot).delete(deleteTarot);
router.route("/tarot/:id").get(Tarot)
module.exports = router;

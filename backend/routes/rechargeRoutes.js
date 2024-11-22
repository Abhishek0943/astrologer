const express = require("express");
const {
    addRecharge, getRechargeHistory, getAllRechargeHistory
} = require("../controllers/rechargeController.js");

const router = express.Router();


router.route("/recharge").get(getRechargeHistory).post(addRecharge)
router.route("/recharge/all").get(getAllRechargeHistory)
module.exports = router;
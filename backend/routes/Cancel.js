const express = require("express");
const { getCancle, addCancle, astro } = require("../controllers/cancleController.js");

const router = express.Router();

router.route("/cancel").get(getCancle).post(addCancle)
router.route("/cancel/:id").get(astro)




module.exports = router;
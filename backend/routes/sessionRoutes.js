const express = require("express");
const {
  getSession, addSession, userSession, Session
} = require("../controllers/sessionController");

const router = express.Router();


router.route("/session").get(getSession).post(addSession)
router.route("/session/user").post(userSession)
router.route("/session/all").get(Session)

module.exports = router;

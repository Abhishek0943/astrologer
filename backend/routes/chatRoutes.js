const express = require("express");
const {
    createChat, fetchChat, sendMessage, allMessages, AdminFetchChat,
    endChat, postReview
} = require("../controllers/chatController.js");

const router = express.Router();

router.route("/chat").get(fetchChat).post(createChat).put(endChat)
router.route("/session/review").post(postReview)




router.route("/message/:id").get(allMessages)
router.route("/message").post(sendMessage)
router.route("/AdminFetchChat").post(AdminFetchChat)

module.exports = router;
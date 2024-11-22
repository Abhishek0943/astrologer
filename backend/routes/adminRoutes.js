const express = require("express");
const {
    addUser,
    login,
    adminAccounts,
    updateAccounts,
    deleteAccount
} = require("../controllers/adminController");
const router = express.Router();

router.route("/adminUser").get(adminAccounts).post(addUser)
router.route("/adminUser/update").post(updateAccounts)
router.route("/adminUser/:id").delete(deleteAccount)
router.route("/adminUser/login").post(login);

module.exports = router;

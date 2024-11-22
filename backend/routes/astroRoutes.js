const express = require("express");
// const { getAstro, addAstro, upload,BusyAstro, GetAstrologerLog, deleteAstro, updateAstroPass, updateAstro, GetAstrologer, Search, myAstro, Astro, getAstroRequest, TokenAstro, loginAstro, StartAstro, StopAstro, sendAstro } = require("../controllers/astroController");

// const router = express.Router();

// router.route("/astro").get(getAstro).post(sendAstro)
// router.route("/astro/add").post(addAstro)
// router.route("/astro/upload").post(upload)
// router.route("/astro/update").post(updateAstro)
// router.route("/astro/updatePass").post(updateAstroPass)
// router.route("/astro/delete").post(deleteAstro)

// router.route("/astro/request").get(getAstroRequest)
// router.route("/astro/GetAstrologer/:id").get(GetAstrologer)
// router.route("/astro/log/:id").get(GetAstrologerLog)



// router.route("/astro/login").post(loginAstro)
// router.route("/astro/:token").get(TokenAstro)

// // router.route("/myAstro/:id").get(myAstro)
// router.route("/astro/:id").get(Astro)
// router.route("/astro/start/:id").get(StartAstro)
// router.route("/astro/stop").post(StopAstro)
// router.route("/astro/busy").post(BusyAstro)
// router.route("/astro/search").post(Search)





// module.exports = router;

const {
    registerUser,
    login,
    tokenLogin,
    emailVerification,
    stepOne,
    stepTwo,
    getAllAstro,
    getAstro,
    updateAstro,
    approve
} = require("../controllers/astroController");

const router = express.Router();

router.route("/astro").post(registerUser).get(getAllAstro).put(updateAstro);
router.route("/astro/login").post(login);
router.route("/astro/token").get(tokenLogin);
router.route("/astro/verify").post(emailVerification);
router.route("/astro/stepOne").post(stepOne);
router.route("/astro/stepTwo").post(stepTwo);
router.route("/astro/approve").post(approve);
router.route("/astro/:id").get(getAstro);


module.exports = router;

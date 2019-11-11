const express = require("express");
const router = express.Router();

const userLib = require("../lib/users");

const parseUser = require("../middlewares/parseAuthorizationData");

router.post("/signup", userLib.postSignUp);
router.post("/login", userLib.postLogin);
router.get("/profile", parseUser, userLib.getProfile);
router.put("/profile/update", parseUser, userLib.updateProfile);

module.exports = router;

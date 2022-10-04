const express = require("express");
const router = express.Router();
const auth = require("./auth");
const user_bio = require("./user_bio");
const user_history = require("./user_history");

router.use("/auth", auth);
router.use("/userBio", user_bio);
router.use("/userHistory", user_history);

module.exports = router;

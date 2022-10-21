const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");
const user_history = require("../controllers/user_history");
const user_bio = require("../controllers/user_bio");
const mid = require("../helper/middleware");
const { mustLogin } = require("../helper/middleware");

// router.use("/auth", auth);
// // router.use("/userBio", user_bio);
// router.use("/userHistory", user_history);

// Auth
router.post("/auth", auth.create);
router.post("/auth/login", auth.login);

// User Bio
router.get("/index", user_bio.index);
router.post("/add", mid.mustLogin, mustLogin, user_bio.create);
router.get("/:id", user_bio.show);
router.delete("/", user_bio.delete);

// User History
router.post("/history", mid.mustLogin, user_history.create);
router.get("/history/index", user_history.index);
router.get("/history/:id", user_history.show);

module.exports = router;

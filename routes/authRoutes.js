const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    seedUser
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/seed", seedUser);

module.exports = router;
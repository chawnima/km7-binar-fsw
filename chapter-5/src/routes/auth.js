const express = require("express");
const {
  validateRegister,
  validateLogin,
  authorization,
} = require("../middlewares/auth");
const { register, login, profile } = require("../controllers/auth");

const router = express.Router();
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/profile", authorization(1,2), profile);

module.exports = router;

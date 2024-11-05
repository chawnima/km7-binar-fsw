const express = require("express");
const { authorization } = require("../middlewares/auth");
const { getUniversities } = require("../controllers/universities");
const { adminRole, userRole } = require("../constants/auth");

const router = express.Router();

// It will be run the URL based on path and the method
router.route("/").get(authorization(adminRole, userRole), getUniversities);

module.exports = router;
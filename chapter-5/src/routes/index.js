const express = require("express");
const studentsRouter = require("./students");
const authRouter = require("./auth");
const classesRouter = require("./classes");
const universitiesRouter = require("./universities");
const router = express.Router();

router.use("/students", studentsRouter);
router.use("/auth", authRouter);
router.use("/classes", classesRouter);
router.use("/universities", universitiesRouter);

module.exports = router;

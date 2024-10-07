const express = require("express");
const studentsRouter = require("./students");
const studentsIdRouter=require("./studentsId");

const router = express.Router();

router.use("/students", studentsRouter);
router.use("/students/:id", studentsRouter);

module.exports = router;
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const questionRoutes = require("./questionRoutes.js");
const answerRoutes = require("./answerRoutes.js");
const examRoutes = require("./examRoutes.js");

router.use("/", userRoutes);
router.use("/", questionRoutes);
router.use("/", answerRoutes);
router.use("/", examRoutes);

module.exports = router;

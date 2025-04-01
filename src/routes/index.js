const router = require("express").Router();
const userRoutes = require("./userRoutes");
const questionRoutes = require("./questionRoutes.js");
const answerRoutes = require("./answerRoutes.js");

router.use("/", userRoutes);
router.use("/", questionRoutes);
router.use("/", answerRoutes);

module.exports = router;

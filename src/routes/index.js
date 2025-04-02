const router = require("express").Router();
const userRoutes = require("./userRoutes");
const imageRoutes = require("./imageRoutes");
const questionRoutes = require("./questionRoutes.js");
const answerRoutes = require("./answerRoutes.js");
const examRoutes = require("./examRoutes.js");
const pointsRoutes = require("./pointsRoutes.js");

router.use("/image", imageRoutes);
router.use("/", userRoutes);
router.use("/", questionRoutes);
router.use("/", answerRoutes);
router.use("/", examRoutes);
router.use("/", pointsRoutes);

module.exports = router;

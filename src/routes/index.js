const router = require("express").Router();
const userRoutes = require("./userRoutes");
const imageRoutes = require("./imageRoutes");
const questionRoutes = require("./questionRoutes.js");
const { authToken } = require("../middlewares/authMiddleware.js");
const { openExam } = require("../middlewares/openExam.js");
const answerRoutes = require("./answerRoutes.js");
const examRoutes = require("./examRoutes.js");
const pointsRoutes = require("./pointsRoutes.js");
const performanceRoutes = require("./performanceRoutes.js");
const profileRoutes = require("./profileRoutes.js");
const timeRoutes = require("./timeRoutes");

router.use("/questions", authToken, openExam, questionRoutes);
router.use("/answers", authToken, answerRoutes);
router.use("/exam", authToken, examRoutes);
router.use("/profile", authToken, profileRoutes);
router.get("/auth/verify", authToken, (req, res) => {
  res.status(200).json({ valid: true, user: req.user });
});
router.use("/", userRoutes);
router.use("/", pointsRoutes);
router.use("/", performanceRoutes);
router.use("/time", timeRoutes);
router.use("/image", imageRoutes);

module.exports = router;

const router = require("express").Router();
const userRoutes = require("./userRoutes");
const imageRoutes = require("./imageRoutes");
const questionRoutes = require("./questionRoutes.js");
const { authToken } = require("../middlewares/authMiddleware.js");
const answerRoutes = require("./answerRoutes.js");
const examRoutes = require("./examRoutes.js");
const pointsRoutes = require("./pointsRoutes.js");

router.use("/image", imageRoutes);
router.use("/", userRoutes);
router.use("/", authToken, questionRoutes);
router.get("/auth/verify", authToken, (req, res) => {
  res.status(200).json({ valid: true, user: req.user });
});
router.use("/", questionRoutes);
router.use("/", answerRoutes);
router.use("/", examRoutes);
router.use("/", pointsRoutes);

module.exports = router;

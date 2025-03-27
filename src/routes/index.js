const router = require("express").Router();
const userRoutes = require("./userRoutes");
const imageRoutes = require("./imageRoutes");
const questionRoutes = require("./questionRoutes.js");

router.use("/image", imageRoutes);
router.use("/", userRoutes);
router.use("/", questionRoutes);

module.exports = router;

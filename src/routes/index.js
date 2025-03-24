const router = require("express").Router();
const userRoutes = require("./userRoutes");
const imageRoutes = require("./imageRoutes");

router.use("/image", imageRoutes);
router.use("/", userRoutes);

module.exports = router;

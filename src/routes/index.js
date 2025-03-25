const router = require("express").Router();
const userRoutes = require("./userRoutes");
const questionRoutes = require("./questionRoutes.js");

router.use("/", userRoutes);
router.use("/", questionRoutes);

module.exports = router;

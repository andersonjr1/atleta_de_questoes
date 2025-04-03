const router = require("express").Router();
const userRoutes = require("./userRoutes");
const questionRoutes = require("./questionRoutes.js");
const { authToken } = require("../middlewares/authMiddleware.js")

router.use("/", userRoutes);
router.use("/", authToken, questionRoutes);
router.get('/auth/verify', authToken, (req, res) => {
    res.status(200).json({ valid: true, user: req.user });
});

module.exports = router;

const router = require("express").Router();
const { pointsController } = require("../controllers");
const { authToken } = require("../middlewares/authMiddleware.js");

router.get("/points", authToken, pointsController.getPointsByUser);
router.get("/leaderboard", authToken, pointsController.getAllUserPoints);

module.exports = router;

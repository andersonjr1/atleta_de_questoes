const router = require("express").Router();
const { pointsController } = require("../controllers/pointsController.js");
const { authToken } = require("../middlewares/authMiddleware.js");

router.get("/points", authToken, pointsController.getPointsByUser);
router.get("/leaderboard", authToken, pointsController.getAllUserPoints);
router.get("/performance", authToken, pointsController.getUserPerformance);

module.exports = router;

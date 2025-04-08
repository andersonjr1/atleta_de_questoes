const router = require("express").Router();
const { pointsController } = require("../controllers/pointsController.js");
const { authToken } = require("../middlewares/authMiddleware.js");

router.get("/points", pointsController.getPointsByUser);
router.get("/leaderboard", pointsController.getAllUserPoints);

module.exports = router;

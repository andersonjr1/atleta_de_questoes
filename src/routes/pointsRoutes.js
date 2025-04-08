const router = require("express").Router();
const { pointsController } = require("../controllers");

router.get("/points", pointsController.getPointsByUser);
router.get("/leaderboard", pointsController.getAllUserPoints);

module.exports = router;

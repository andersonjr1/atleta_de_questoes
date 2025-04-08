const router = require("express").Router();
const { pointsController } = require("../controllers/pointsController.js");

router.get("/points", pointsController.getPointsByUser);
router.get("/leaderboard", pointsController.getAllUserPoints);

module.exports = router;

const router = require("express").Router();
const { performanceController } = require("../controllers");
const { authToken } = require("../middlewares/authMiddleware.js");

router.get(
  "/subject-performance",
  authToken,
  performanceController.getSubjectPerformance
);
router.get("/performance", authToken, performanceController.getUserPerformance);

module.exports = router;

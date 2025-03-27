const router = require("express").Router();
const { questionController } = require("../controllers/questionController.js");

router.post("/questions", questionController.create);
router.get("/questions/:id", questionController.getById);
router.delete("/questions/:id", questionController.delete);

module.exports = router;

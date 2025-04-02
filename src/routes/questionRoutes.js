const router = require("express").Router();
const { questionController } = require("../controllers/questionController.js");

router.get("/questions/search", questionController.search);
router.post("/questions", questionController.create);
router.get("/questions", questionController.getQuestions);
router.get("/questions/:id", questionController.getById);
router.delete("/questions/:id", questionController.delete);

module.exports = router;

const router = require("express").Router();
const { questionController } = require("../controllers/questionController.js");

router.get("/questions/search", questionController.search);
router.get("/questions/:id", questionController.getById);
router.delete("/questions/:id", questionController.delete);

module.exports = router;

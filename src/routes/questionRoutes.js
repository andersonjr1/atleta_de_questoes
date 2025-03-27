const router = require("express").Router();
const { questionController } = require("../controllers/questionController.js");

router.get("/questions/:id", questionController.getById);
router.delete("/questions/:id", questionController.delete);
router.get("/search", questionController.search);


module.exports = router;

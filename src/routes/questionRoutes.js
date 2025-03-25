const router = require("express").Router();
const { questionController } = require("../controllers/questionController.js");

router.get("/questions/:id", questionController.getById);

module.exports = router;
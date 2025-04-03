const router = require("express").Router();

const { questionController } = require("../controllers/questionController.js");
const { isAdmin } = require("../middlewares/isAdminMiddleware.js");

router.post("/questions", questionController.create);
router.get("/questions/:id", questionController.getById);
router.put("/questions/:id", isAdmin, questionController.update);
router.delete("/questions/:id", questionController.delete);

module.exports = router;
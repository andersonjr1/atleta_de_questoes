const router = require("express").Router();

const { questionController } = require("../controllers/questionController.js");
const { authToken } = require("../middlewares/authMiddleware.js");
const { isAdmin } = require("../middlewares/isAdminMiddleware.js");

router.get("/questions/search", questionController.search);
router.post("/questions", questionController.create);
router.get("/questions/:id", questionController.getById);
router.put("/questions/:id", authToken, isAdmin, questionController.update);
router.delete("/questions/:id", questionController.delete);

module.exports = router;

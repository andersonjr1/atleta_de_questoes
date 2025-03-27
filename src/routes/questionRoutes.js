const router = require("express").Router();

const { questionController } = require("../controllers/questionController.js");
const { authToken } = require("../middlewares/authMiddleware.js");
const { isAdmin } = require("../middlewares/isAdminMiddleware.js");

router.get("/questions/:id", questionController.getById);
router.put("/questions/:id", authToken, isAdmin, questionController.update);

module.exports = router;
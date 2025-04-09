const router = require("express").Router();

const { questionController } = require("../controllers");
const { isAdmin } = require("../middlewares/isAdminMiddleware.js");

router.get("/", questionController.search);
router.post("/", isAdmin, questionController.create);
router.get("/:id", questionController.getById);
router.put("/:id", isAdmin, questionController.update);
router.delete("/:id", isAdmin, questionController.delete);

module.exports = router;

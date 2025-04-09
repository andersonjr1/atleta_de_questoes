const router = require("express").Router();
const { profileController } = require("../controllers");
const { uploadWithCleanup } = require("../middlewares/uploadMiddleware.js");

router.get("/", profileController.getProfile);
router.patch("/", profileController.updateProfile);
router.post("/avatar", uploadWithCleanup, profileController.updateAvatar);

module.exports = router;

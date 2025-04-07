const router = require("express").Router();
const { userController } = require("../controllers");
const { authToken } = require("../middlewares/authMiddleware.js")
const { uploadWithCleanup } = require("../middlewares/uploadMiddleware.js")

router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/logout", userController.logout);
router.get("/user/profile", authToken, userController.getProfile);
router.patch("/user/profile", authToken, userController.updateProfile);
router.post("/user/profile/avatar", authToken, uploadWithCleanup, userController.updateAvatar);

module.exports = router;

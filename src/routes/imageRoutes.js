const router = require("express").Router();
const { imageController } = require("../controllers");
const multer = require("multer");
const path = require("path");
const { v4 } = require("uuid");

const storage = multer.diskStorage({
  destination: "./src/public/images/",
  filename: (req, file, cb) => {
    const filename = `${v4()}${path.extname(file.originalname)}`;
    return cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

router.post("/", upload.single("question"), imageController.saveImage);

module.exports = router;

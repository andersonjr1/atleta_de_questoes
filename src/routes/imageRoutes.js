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

/**
 * @openapi
 * tags:
 *   name: Images
 *   description: Upload de imagens para questões
 */

/**
 * @openapi
 * /images:
 *   post:
 *     summary: Faz upload de uma imagem para questões
 *     tags: [Images]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo de imagem (JPEG/PNG, máximo 2MB)
 *     responses:
 *       201:
 *         description: Upload realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   example: 1
 *                 path:
 *                   type: string
 *                   example: "/images/uuid-filename.jpg"
 *       400:
 *         description: Arquivo inválido ou muito grande
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Tipo de arquivo não suportado"
 *       413:
 *         description: Arquivo muito grande (limite de 2MB)
 */
router.post("/", upload.single("question"), imageController.saveImage);

module.exports = router;

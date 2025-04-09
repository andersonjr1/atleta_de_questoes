const router = require("express").Router();
const { profileController } = require("../controllers");
const { uploadWithCleanup } = require("../middlewares/uploadMiddleware.js");

/**
 * @openapi
 * tags:
 *   name: Profile
 *   description: Gerenciamento de perfil do usuário
 */

/**
 * @openapi
 * /profile:
 *   get:
 *     summary: Obtém os dados do perfil do usuário
 *     tags: [Profile]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Dados do perfil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Perfil não encontrado
 */
router.get("/", profileController.getProfile);

/**
 * @openapi
 * /profile:
 *   patch:
 *     summary: Atualiza os dados do perfil
 *     tags: [Profile]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileUpdate'
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.patch("/", profileController.updateProfile);

/**
 * @openapi
 * /profile/avatar:
 *   post:
 *     summary: Atualiza o avatar do usuário
 *     tags: [Profile]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo de imagem (JPG, PNG)
 *     responses:
 *       200:
 *         description: Avatar atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 avatarUrl:
 *                   type: string
 *                   example: "/uploads/avatars/filename.jpg"
 *       400:
 *         description: Arquivo inválido ou ausente
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro ao processar imagem
 */
router.post("/avatar", uploadWithCleanup, profileController.updateAvatar);

module.exports = router;

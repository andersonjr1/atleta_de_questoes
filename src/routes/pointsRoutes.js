const router = require("express").Router();
const { pointsController } = require("../controllers");
const { authToken } = require("../middlewares/authMiddleware.js");

/**
 * @openapi
 * tags:
 *  name: Points
 *  description: Gerenciamento de pontos e ranking do usuário
 */

/**
 * @openapi
 * /points:
 *   get:
 *     summary: Obtém os pontos e nível do usuário atual
 *     tags: [Points]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Dados de pontos do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPoints'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 */
router.get("/points", authToken, pointsController.getPointsByUser);

/**
 * @openapi
 * /leaderboard:
 *   get:
 *     summary: Obtém o ranking completo de usuários
 *     tags: [Points]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Ranking de usuários
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Leaderboard'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 */
router.get("/leaderboard", authToken, pointsController.getAllUserPoints);

module.exports = router;

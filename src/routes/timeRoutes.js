const router = require("express").Router();
const { timeController } = require("../controllers");

/**
 * @openapi
 * tags:
 *  name: Time
 *  description: Utilizado para horario do servidor
 */

/**
 * @openapi
 * /time:
 *   get:
 *     summary: Pega o tempo atual do servidor
 *     tags: [Time]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Tempo atual no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 time:
 *                   type: Date
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 */
router.get("/", timeController.getTime);

module.exports = router;

const router = require("express").Router();
const { performanceController } = require("../controllers");
const { authToken } = require("../middlewares/authMiddleware.js");

/**
 * @openapi
 * tags:
 *  name: Performance
 *  description: Análise de desempenho do usuário
 */

/**
 * @openapi
 * /subject-performance:
 *   get:
 *     summary: Obtém o desempenho por disciplina
 *     tags: [Performance]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *           example: 2023
 *         description: Ano para filtrar os resultados
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *           example: 5
 *         description: Mês para filtrar os resultados (1-12)
 *     responses:
 *       200:
 *         description: Desempenho por disciplina
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 matematica:
 *                   $ref: '#/components/schemas/SubjectPerformance'
 *                 linguagens:
 *                   $ref: '#/components/schemas/SubjectPerformance'
 *                 "ciencias-natureza":
 *                   $ref: '#/components/schemas/SubjectPerformance'
 *                 "ciencias-humanas":
 *                   $ref: '#/components/schemas/SubjectPerformance'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 */
router.get(
  "/subject-performance",
  authToken,
  performanceController.getSubjectPerformance
);

/**
 * @openapi
 * /performance:
 *   get:
 *     summary: Obtém o desempenho mensal do usuário
 *     tags: [Performance]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *           example: 2023
 *         description: Ano para filtrar os resultados
 *       - in: query
 *         name: discipline
 *         schema:
 *           type: string
 *           enum: [matematica, linguagens, ciencias-natureza, ciencias-humanas]
 *           example: "matematica"
 *         description: Disciplina para filtrar os resultados
 *     responses:
 *       200:
 *         description: Desempenho mensal
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MonthlyPerformance'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 */
router.get("/performance", authToken, performanceController.getUserPerformance);

module.exports = router;

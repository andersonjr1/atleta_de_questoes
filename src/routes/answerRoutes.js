const router = require("express").Router();
const { answerController } = require("../controllers");

/**
 * @openapi
 * tags:
 *  name: Answers
 *  description: Gerenciamente de respostas às questões
 */

/**
 * @openapi
 * /answers:
 *   post:
 *     summary: Salva uma resposta normal (não vinculada a exame)
 *     tags: [Answers]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnswerInput'
 *     responses:
 *       201:
 *         description: Resposta salva com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 *       400:
 *         description: Dados inválidos ou faltando
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 */
router.post("/", answerController.saveNormalAnswer);

/**
 * @openapi
 * /answers:
 *   get:
 *     summary: Lista todas as respostas do usuário (com paginação)
 *     tags: [Answers]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 10
 *         description: Limite de itens por página
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *           example: "2023-01-01"
 *         description: Data inicial para filtro (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *           example: "2023-12-31"
 *         description: Data final para filtro (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Lista de respostas com paginação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedAnswers'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 */
router.get("/", answerController.getUserAnswers);

/**
 * @openapi
 * /answers/{questionId}:
 *   get:
 *     summary: Obtém uma resposta específica do usuário
 *     tags: [Answers]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da questão
 *     responses:
 *       200:
 *         description: Resposta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnswerWithQuestion'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Resposta não encontrada
 *       500:
 *         description: Erro no servidor
 */
router.get("/:questionId", answerController.getSpecificAnswer);

module.exports = router;

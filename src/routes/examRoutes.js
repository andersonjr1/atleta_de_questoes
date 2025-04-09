const router = require("express").Router();
const { examController } = require("../controllers");
const { openExam } = require("../middlewares/openExam.js");

/**
 * @openapi
 * tags:
 *  name: Exams
 *  description: Gerenciamento de exames simulados
 */

/**
 * @openapi
 * /exam:
 *   get:
 *     summary: Lista todos os exames do usuário
 *     tags: [Exams]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de exames
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exam'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 */
router.get("/", examController.getAllExams);

/**
 * @openapi
 * /exam/{examId}:
 *   get:
 *     summary: Obtém um exame específico por ID
 *     tags: [Exams]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do exame
 *     responses:
 *       200:
 *         description: Detalhes do exame
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exam'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Exame não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get("/:examId", examController.getExamById);

/**
 * @openapi
 * /exam:
 *   post:
 *     summary: Cria um novo exame simulado
 *     tags: [Exams]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       201:
 *         description: Exame criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exam'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 */
router.post("/", openExam, examController.createExam);

/**
 * @openapi
 * /exam/{examId}:
 *   put:
 *     summary: Finaliza um exame simulado
 *     tags: [Exams]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do exame
 *     responses:
 *       200:
 *         description: Exame finalizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exam'
 *       400:
 *         description: Exame já finalizado ou expirado
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 */
router.put("/:examId", examController.respondExam);

/**
 * @openapi
 * /exam/{examId}/question/{questionId}:
 *   put:
 *     summary: Salva resposta de uma questão do exame
 *     tags: [Exams]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do exame
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da questão
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_alternative
 *             properties:
 *               id_alternative:
 *                 type: string
 *                 format: uuid
 *                 description: ID da alternativa selecionada
 *     responses:
 *       200:
 *         description: Resposta salva com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExamQuestionResponse'
 *       400:
 *         description: Exame já finalizado, expirado ou questão não pertence ao exame
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 */
router.put(
  "/:examId/question/:questionId",
  examController.saveExamQuestionResponse
);

module.exports = router;

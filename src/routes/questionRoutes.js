const router = require("express").Router();

const { questionController } = require("../controllers");
const { isAdmin } = require("../middlewares/isAdminMiddleware.js");

/**
 * @openapi
 * tags:
 *   name: Questions
 *   description: Gerenciamento de questões
 */

/**
 * @openapi
 * /questions:
 *   get:
 *     summary: Busca questões com filtros
 *     tags: [Questions]
 *     parameters:
 *       - in: query
 *         name: texto
 *         schema:
 *           type: string
 *         description: Texto para busca no contexto da questão
 *       - in: query
 *         name: vestibular
 *         schema:
 *           type: string
 *         description: Nome do vestibular 
 *       - in: query
 *         name: disciplinas
 *         schema:
 *           type: string
 *         description: Lista de disciplinas separadas por vírgula
 *       - in: query
 *         name: assunto
 *         schema:
 *           type: string
 *         description: Lista de sub-disciplinas separadas por vírgula
 *       - in: query
 *         name: ano
 *         schema:
 *           type: string
 *         description: Lista de anos separados por vírgula
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *         description: Nível de dificuldade (1-5)
 *       - in: query
 *         name: random
 *         schema:
 *           type: boolean
 *         description: Ordenar aleatoriamente
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página para paginação
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limite de itens por página
 *       - in: query
 *         name: amount
 *         schema:
 *           type: integer
 *         description: Quantidade fixa de itens (ignora paginação)
 *     responses:
 *       200:
 *         description: Lista de questões encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Question'
 *                 previous:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                 next:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *       500:
 *         description: Erro no servidor
 */
router.get("/", questionController.search);

/**
 * @openapi
 * /questions:
 *   post:
 *     summary: Cria uma nova questão (Apenas admin)
 *     tags: [Questions]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestionInput'
 *     responses:
 *       200:
 *         description: Questão criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       400:
 *         description: Dados inválidos ou faltando
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado (não é admin)
 */
router.post("/", isAdmin, questionController.create);

/**
 * @openapi
 * /questions/{id}:
 *   get:
 *     summary: Obtém uma questão por ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da questão
 *     responses:
 *       200:
 *         description: Questão encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: Questão não encontrada
 *       500:
 *         description: Erro no servidor
 */
router.get("/:id", questionController.getById);

/**
 * @openapi
 * /questions/{id}:
 *   put:
 *     summary: Atualiza uma questão (Apenas admin)
 *     tags: [Questions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *             $ref: '#/components/schemas/QuestionInput'
 *     responses:
 *       200:
 *         description: Questão atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Questão atualizada com sucesso"
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado (não é admin)
 *       404:
 *         description: Questão não encontrada
 */
router.put("/:id", isAdmin, questionController.update);

/**
 * @openapi
 * /questions/{id}:
 *   delete:
 *     summary: Remove uma questão (Apenas admin)
 *     tags: [Questions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da questão
 *     responses:
 *       200:
 *         description: Questão removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Questão deletada com sucesso"
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado (não é admin)
 *       404:
 *         description: Questão não encontrada
 */
router.delete("/:id", isAdmin, questionController.delete);

module.exports = router;

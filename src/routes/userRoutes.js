const router = require("express").Router();
const { userController } = require("../controllers");

/**
 * @openapi
 * tags:
 *  name: Auth
 *  description: Rotas para registrar e autenticar o usuário
 */


/**
 * @openapi
 * /login:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: SESSION_ID=abcde12345; Path=/; HttpOnly; Expires=Wed, 21 Oct 2025 07:28:00 GMT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Campos obrigatórios faltando
 *       401:
 *         description: Credenciais inválidas
 *       404:
 *         description: Usuário não encontrado
 */
router.post("/login", userController.login);

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Dados inválidos
 *         examples:
 *           missing-field:
 *             value: { message: "Digite um nome" }
 *           invalid-email:
 *             value: { message: "Digite um email válido" }
 *           invalid-password:
 *             value: { message: "Senha deve ter 8-30 caracteres com maiúsculas, minúsculas e números" }
 *       401:
 *         description: Validação falhou
 *       409:
 *         description: Usuário já existe
 */
router.post("/register", userController.register);

/**
 * @openapi
 * /logout:
 *   post:
 *     summary: Desloga o usuário
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout bem-sucedido
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: SESSION_ID=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT
 *       500:
 *         description: Erro interno
 */
router.post("/logout", userController.logout);

module.exports = router;

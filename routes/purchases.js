/**
 * @swagger
 * tags:
 *   name: Purchases
 *   description: Gestión de compras
 */

/**
 * @swagger
 * /api/purchases:
 *   get:
 *     summary: Listar todas las compras
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de compras
 */

/**
 * @swagger
 * /api/purchases:
 *   post:
 *     summary: Crear una nueva compra
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "64fb23de12ab56c098765432"
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Compra registrada exitosamente
 *       400:
 *         description: Error en la compra
 */

var express = require('express');
var router = express.Router();
var purchaseController = require('../controllers/purchaseController');
var { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, purchaseController.create);
router.get('/history', authenticateToken, purchaseController.history);
router.get('/invoice/:id', authenticateToken, purchaseController.invoice);
router.get('/all', authenticateToken, isAdmin, purchaseController.allPurchases);

module.exports = router;

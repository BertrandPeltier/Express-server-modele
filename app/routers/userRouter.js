/**
 * Router secondaire
 */
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Routing for User
router.get('/', authMiddleware.verifyToken, userController.getUserId, userController.findById);

// Routing for Admin
router.get('/secure/all', authMiddleware.verifyToken, adminMiddleware.isAdmin, userController.findAll);
router.get('/secure/:id(\\d+)', authMiddleware.verifyToken, adminMiddleware.isAdmin, userController.findById);

module.exports = router;
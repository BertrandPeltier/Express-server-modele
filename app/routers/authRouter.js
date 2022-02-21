const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const validationMiddleware = require('../middlewares/validationMiddleware');
const userSchema = require('../middlewares/validationSchema/userSchema');

router.post('/signup', validationMiddleware.validateBody(userSchema), authController.signup);
router.post('/signin', authController.signin);
router.get('/token', authController.getAccessToken);

module.exports = router;
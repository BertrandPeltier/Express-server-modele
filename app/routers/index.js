/**
 * Router principal
 */
const express = require('express');
const router = express.Router();
const baseUrl = process.env.BASE_URL;

const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
const errorsMiddleware = require('../middlewares/errorsMiddleware');

// Route Welcome
router.get(`${baseUrl}/`, (_, response) => {
    response.status(200).json({
        message: 'Welcome to my API'
    });
});

// Routing vers les routers secondaires
router.use(`${baseUrl}/user`, userRouter);
router.use(`${baseUrl}/auth`, authRouter);

// Gestion des erreurs 404 et 500
router.use(errorsMiddleware.error404);
router.use(errorsMiddleware.errors);

module.exports = router;
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para verificar as respostas das perguntas
router.post('/verify-answers', authController.verifyAnswers);

module.exports = router;

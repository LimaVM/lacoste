const express = require('express');
const path = require('path');
const cors = require('cors');
const forumRoutes = require('./routes/forumRoutes');
const authRoutes = require('./routes/authRoutes');
const authController = require('./controllers/authController');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Verificar se o IP está autorizado antes de acessar o fórum
app.use('/forum', authController.checkAuthorization);

// Rotas de autenticação
app.use('/auth', authRoutes);

// Rotas do fórum
app.use('/forum', forumRoutes);

// Iniciar o servidor
app.listen(80, () => {
  console.log('Servidor rodando na porta 80');
});

const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const multer = require('multer');
const path = require('path');

// Configurar o armazenamento dos arquivos de imagem/vídeo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Filtrar para aceitar apenas imagens e vídeos
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|mp4|webm|ogg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Arquivos de imagem ou vídeo apenas!');
  }
};

// Configurar o multer para o upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 50 }, // Limite de 50MB
  fileFilter: fileFilter
});

// Rota para criar uma nova postagem
router.post('/post', upload.single('image'), forumController.createPost);

// Rota para obter todas as postagens
router.get('/posts', forumController.getPosts);

module.exports = router;

const fs = require('fs');
const path = require('path');

// Caminho para o arquivo JSON que armazena as postagens
const postsFilePath = path.join(__dirname, '../../data/posts.json');

// Função para ler postagens do arquivo JSON
const readPostsFromFile = () => {
  try {
    const data = fs.readFileSync(postsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Função para salvar postagens no arquivo JSON
const savePostsToFile = (posts) => {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf8');
};

// Função para criar uma nova postagem
exports.createPost = (req, res) => {
  const { username, content } = req.body;
  const filePath = req.file ? `/uploads/${req.file.filename}` : null;

  // Ler as postagens existentes
  const posts = readPostsFromFile();

  // Criar a nova postagem
  const newPost = {
    id: Date.now().toString(),
    username,
    content,
    image: filePath, // Adicionar o caminho da imagem ou vídeo
    createdAt: new Date()
  };

  // Adicionar a nova postagem ao início do array (postagens mais recentes no topo)
  posts.unshift(newPost);

  // Salvar as postagens no arquivo JSON
  savePostsToFile(posts);

  // Retornar a nova postagem
  res.status(200).json(newPost);
};

// Função para listar todas as postagens
exports.getPosts = (req, res) => {
  const posts = readPostsFromFile();
  res.status(200).json(posts);
};

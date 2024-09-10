const fs = require('fs');
const path = require('path');

// Caminho para o arquivo que armazena os IPs autorizados
const filePath = path.join(__dirname, '../../data/authorized_ips.txt');

// Função para ler os IPs autorizados do arquivo
const readAuthorizedIps = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split('\n').filter(Boolean); // Dividir por linha e remover linhas vazias
  } catch (err) {
    return [];
  }
};

// Função para adicionar um IP ao arquivo de IPs autorizados
const addAuthorizedIp = (ip) => {
  const authorizedIps = readAuthorizedIps();
  
  if (!authorizedIps.includes(ip)) {
    fs.appendFileSync(filePath, ip + '\n', 'utf8');
  }
};

// Verificar as respostas e autorizar o IP
exports.verifyAnswers = (req, res) => {
  const { userAnswers } = req.body;
  const userIp = req.ip;

  const correctAnswers = ['D', 'B']; // Respostas corretas para as duas primeiras perguntas

  const isCorrect = correctAnswers.every((answer, index) => answer === userAnswers[index]);
  const isThirdCorrect = userAnswers[2] !== ''; // A terceira resposta pode ser qualquer coisa

  if (isCorrect && isThirdCorrect) {
    // Adicionar o IP ao arquivo de IPs autorizados
    addAuthorizedIp(userIp);
    return res.status(200).json({ message: 'Autorizado' });
  } else {
    return res.status(401).json({ message: 'Respostas incorretas' });
  }
};

// Verificar se o IP está autorizado
exports.checkAuthorization = (req, res, next) => {
  const userIp = req.ip;
  const authorizedIps = readAuthorizedIps();

  if (authorizedIps.includes(userIp)) {
    next(); // O IP está autorizado, continuar
  } else {
    res.redirect('/auth/verify-answers'); // Redireciona para a página de perguntas
  }
};

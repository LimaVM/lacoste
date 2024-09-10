document.getElementById('authForm').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const question1 = document.getElementById('question1').value;
    const question2 = document.getElementById('question2').value;
    const question3 = document.getElementById('question3').value;
  
    const response = await fetch('/auth/verify-answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userAnswers: [question1, question2, question3] })
    });
  
    const result = await response.json();
    const messageElement = document.getElementById('message');
  
    if (response.status === 200) {
      // Exibe mensagem de sucesso
      messageElement.textContent = 'Autorizado! Redirecionando para o fórum...';
      messageElement.style.color = '#417c0c';
  
      // Aguarda 1 segundo e redireciona para o fórum
      setTimeout(() => {
        window.location.href = '/forum.html';
      }, 1000);
    } else {
      // Exibe mensagem de erro
      messageElement.textContent = 'Respostas incorretas, tente novamente.';
      messageElement.style.color = '#ff4c4c';
    }
  });
  
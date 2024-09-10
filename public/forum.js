// Função para carregar as postagens ao carregar a página
window.onload = async function () {
  try {
    const response = await fetch('/forum/posts');
    const posts = await response.json();

    // Adicionar todas as postagens ao feed (da mais nova para a mais antiga)
    posts.forEach(post => addPostToFeed(post));
  } catch (error) {
    console.error('Erro ao carregar postagens:', error);
  }
};

// Capturar o evento de envio do formulário de postagem
document.getElementById('postForm').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevenir o comportamento padrão do formulário de recarregar a página

  const username = document.getElementById('username').value;
  const content = document.getElementById('content').value;
  const image = document.getElementById('image').files[0]; // Capturar a imagem ou vídeo, se houver

  const formData = new FormData();
  formData.append('username', username);
  formData.append('content', content);
  if (image) {
    formData.append('image', image);
  }

  try {
    const response = await fetch('/forum/post', {
      method: 'POST',
      body: formData
    });

    if (response.status === 200) {
      const result = await response.json();
      addPostToFeed(result); // Adicionar a nova postagem ao feed em tempo real
      document.getElementById('postForm').reset(); // Limpar o formulário após a postagem
      document.getElementById('preview').innerHTML = ''; // Limpar o preview
    } else {
      alert('Erro ao postar!');
    }
  } catch (error) {
    console.error('Erro ao enviar a postagem:', error);
  }
});

// Função para adicionar uma nova postagem ao feed
function addPostToFeed(post) {
  const feed = document.getElementById('feed');
  const postDiv = document.createElement('div');
  postDiv.className = 'post';

  const username = document.createElement('h3');
  username.textContent = post.username;

  const content = document.createElement('p');
  content.textContent = post.content;

  const timestamp = document.createElement('small');
  const postDate = new Date(post.createdAt);
  timestamp.textContent = `Postado em: ${postDate.toLocaleString()}`;

  postDiv.appendChild(username);
  postDiv.appendChild(content);
  postDiv.appendChild(timestamp);

  // Adicionar a imagem ou vídeo se existir
  if (post.image) {
    const mediaType = post.image.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(mediaType)) {
      const img = document.createElement('img');
      img.src = post.image;
      img.style.maxWidth = "100%";
      img.style.marginTop = "10px";
      postDiv.appendChild(img);
    } else if (['mp4', 'webm', 'ogg'].includes(mediaType)) {
      const video = document.createElement('video');
      video.src = post.image;
      video.controls = true;
      video.style.maxWidth = "100%";
      video.style.marginTop = "10px";
      postDiv.appendChild(video);
    }
  }

  feed.prepend(postDiv); // Adicionar a postagem no início do feed
}

// Função para mostrar o preview do arquivo selecionado
document.getElementById('image').addEventListener('change', function (event) {
  const previewDiv = document.getElementById('preview');
  previewDiv.innerHTML = ''; // Limpar o preview anterior

  const file = event.target.files[0];
  if (file) {
    const fileType = file.type.split('/')[0];

    if (fileType === 'image') {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.style.maxWidth = "150px";
      img.style.marginTop = "10px";
      previewDiv.appendChild(img);
    } else if (fileType === 'video') {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.controls = true;
      video.style.maxWidth = "150px";
      video.style.marginTop = "10px";
      previewDiv.appendChild(video);
    }
  }
});

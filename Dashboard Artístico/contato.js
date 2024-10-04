const valores = document.querySelectorAll('.inputs');

async function enviarContato(event) {
  event.preventDefault();
  const email = valores[0].value;
  const nome = valores[1].value;
  const assunto = valores[2].value;
  const mensagem = valores[3].value;
  const imagemRecebida = valores[4].files[0];
  fetch('http://localhost:3000/contato', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      nome,
      assunto,
      mensagem,
    }),
  })
    .then((response) => response.text())
    .then((result) => {
      alert(result);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

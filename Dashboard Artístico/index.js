fetch('https://crispy-garbanzo-4jq7jw69vj9w3gx5-3000.app.github.dev/eventos')
.then (response => response.json())
.then(json => {
  let newjson = JSON.stringify(json);
  newjson = JSON.parse(newjson);
  console.log(newjson);
  let x = document.querySelectorAll(".title");
  let y = document.querySelectorAll(".pop");
  let a = document.querySelectorAll(".content");
  var z = document.querySelectorAll(".info");
  console.log(x);
  console.log(y);
  console.log(z);
  for (let i = 0; i < newjson.length; i++) {
    x[i].innerHTML = newjson[i].nome;
    for (j = 0; j < 3; j++) {
      switch (j) {
        case 1:
          y[i].innerHTML += newjson[i].popularidade;
          break;
        case 2:
          a[i].innerHTML = "Data de Encerramento: " + newjson[i].encerramento;
          break;
        case 3:
          z[i].innerHTML = newjson[i].descricao;
          break;
        case 0:
          x[i].innerHTML = newjson[i].nome;
      }
    }
  }
  
  

  
  /*
    switch (j) {}
  

  for (let i = 0; i < x.length; i++) {
    x[i].innerHTML = newjson[i].nome;
  }
  for (let i = 0; i < x.length; i++) {
    y[i].innerHTML += newjson[i].popularidade;
  }
  for (let i = 0; i < x.length; i++) {
    z[i].innerHTML = newjson[i].descricao;
  }*/
});
fetch('https://crispy-garbanzo-4jq7jw69vj9w3gx5-3000.app.github.dev/generate-secret')
  .then(response => response.json())
  .then(data => {
    document.getElementById('qr-code').innerHTML += `<h4>AUTENTIQUE-SE ATRAVÉS DO QR-CODE:</h4><img src="${data.qr_code}">`;
    localStorage.setItem('secret', data.secret);
  });

function verifyToke() {
  const token = document.getElementById('token').value;
  const secret = localStorage.getItem('secret');
  const response = document.getElementById('response');
  console.log(secret);
  fetch('https://crispy-garbanzo-4jq7jw69vj9w3gx5-3000.app.github.dev/verify-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token, secret })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log(`Token recebido: ${token}`);
    console.log(`Secret recebido: ${secret}`);
    if (data.verified) {
      response.innerHTML = 'Token verificado com sucesso!';
      response.style.color = 'green';
    } else {
      response.innerHTML = 'Token inválido!';
      response.style.color = 'red';
        
      }
    });
    
  }
  function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
  }

const apiKey = 'QX4GEKAP6DWOSBOK2SZY'

async function fetchEvents() {
  const eventContainer = document.getElementById('events');

  try {
    const response = await fetch('../back/Database/eventos.json');
    const events = await response.json();
    updateEvents(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    eventContainer.innerHTML = '<p>There was an error fetching events. Please try again later.</p>';
  }
}

function updateEvents(events) {
  const eventContainer = document.getElementById('events');

  eventContainer.innerHTML = '';
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));

  console.log(startOfWeek, endOfWeek);
  const weeklyEvents = events.filter(event => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    console.log(startDate, endDate);
    return (startDate >= startOfWeek && startDate <= endOfWeek) || (endDate >= startOfWeek && endDate <= endOfWeek);
  }).slice(0, 3);

  if (weeklyEvents.length > 0) {
    weeklyEvents.forEach(event => {
      const eventElement = document.createElement('div');
      const endDate = new Date(event.endDate);
      const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
      eventElement.innerHTML = `
        <h2>${event.name}</h2>
        <p>${event.description}</p>
        <p><strong>End Date:</strong> ${endDate.toLocaleDateString()}</p>
        <p><strong>Days Left:</strong> ${daysLeft} days</p>
      `;
      eventContainer.appendChild(eventElement);
    });
  } else {
    eventContainer.innerHTML = '<p>No events found for this week.</p>';
  }
}

setInterval(fetchEvents, 24 * 60 * 60 * 1000);

document.addEventListener('DOMContentLoaded', fetchEvents);


function info() {
  let y = document.querySelector("#info1");
  let x = document.querySelectorAll(".evento");
  let z = document.getElementById('sim');
  fetch('https://crispy-garbanzo-4jq7jw69vj9w3gx5-3000.app.github.dev/eventos') 
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  y.innerHTML = infos[0];

  x[0].removeChild(z)
  x[0].innerHTML += '<button id=sim onclick="min()" >Menos Informações</button>'

}

function min() {
  let x = document.querySelectorAll(".evento");
  let z = document.getElementById('sim');
  let y = document.querySelector("#info1");
  y.innerHTML = '';
  x[0].removeChild(z)
  x[0].innerHTML += '<button id=sim onclick="info()" >Mais Informações</button>'
}

function info2() {
  let y = document.querySelector("#info2");

  y.innerHTML = infos[1];

  document.getElementById('sim').innerHTML = "Menos Informações";
}

function info3() {
  let y = document.querySelector("#info3");

  y.innerHTML = infos[2];

  document.getElementById('sim').innerHTML = "Menos Informações";
}


const infos = ["<b>Mais Informações </b> <br> O Recital Pedro Valença promete ser um evento emocionante e imperdível! Aqui estão alguns detalhes sobre o que vai ocorrer: <br> Data e Hora: O recital acontecerá no dia 24 de fevereiro de 2024, às 17h, no Espaço Novo Tempo Umarizal1. Local: Espaço Novo Tempo Umarizal, Belém. Artista: Pedro Valença, um talentoso compositor conhecido por sucessos como “Haja Mais Amor”, “Tudo o que Eu Vivi” e 'Só o Começo'. Programação: Prepare-se para uma tarde repleta de música, emoção e boas vibrações. Pedro Valença encantará o público com suas canções que falam de amor, empatia e acolhimento1. Entrada: A entrada será simbólica, apenas 1kg de alimento não perecível, unindo música e solidariedade em um só lugar1. Não perca essa oportunidade única de vivenciar um recital inesquecível e contribuir para uma causa nobre. Marque na sua agenda e convide amigos e familiares para se juntarem a nós nesse evento incrível!",
  "<b>Mais Informações </b> <br> A exposição explorará temas como a evolução da arte moderna no Brasil, a influência do modernismo na cultura contemporânea e as novas tendências artísticas", "<b>Mais Informações </b> <br> A primeira edição do Jampa Rock Festival vai rolar no dia 24 de agosto de 2024, no Espaço Cultural, em João Pessoa, na Paraíba. O festival originalmente aconteceria em 2020, mas devido a pandemia, precisou ser cancelado. Finalmente, este ano temos uma data e um line up que promete muito rock’n’roll. As atrações confirmadas no line up são Nenhum de Nós, Biquini, Nando Reis, Black Machine e Capital Inicial. Os ingressos estão disponíveis com valores entre R$ 112 e R$ 704. *Os valores podem ser modificados no site oficial, de acordo com o lote. A classificação é de 16 anos, com autorização."

];

const successData = [
  {
      artist: 'Artista João Silva',
      title: 'Quadro: Sol Brilha',
      releaseDate: '15 de agosto de 2024',
      link: 'https://linkparaofrango.com/o-sol-brilha',
      image: 'https://via.placeholder.com/150'
  },
  {
      artist: 'Banda Aviões do sucesso',
      title: 'Dança do Coração',
      releaseDate: '10 de agosto de 2024',
      link: 'https://linkparaofrango.com/danca-do-coracao',
      image: 'https://via.placeholder.com/150'
  },
  {
      artist: 'Cantor Pedro Santos',
      title: 'Caminho da Luz',
      releaseDate: '5 de agosto de 2024',
      link: 'https://linkparaofrango.com/caminho-da-luz',
      image: 'https://via.placeholder.com/150'
  }
];

let currentIndex = 0;


function loadSuccesses() {
  const successList = document.getElementById('success-list');
  const itemsToLoad = 1; 
  for (let i = 0; i < itemsToLoad; i++) {
      if (currentIndex >= successData.length) {
          document.getElementById('load-more').style.display = 'none'; 
          return;
      }

      const success = successData[currentIndex];
      const successElement = document.createElement('div');
      successElement.className = 'success';
      successElement.innerHTML = `
          <img src="${success.image}" alt="${success.artist}">
          <div class="success-info">
              <h3>${success.artist} - "${success.title}"</h3>
              <p>Lançamento: ${success.releaseDate}</p>
              <a href="${success.link}" target="_blank">Ouça agora</a>
          </div>
      `;
      successList.appendChild(successElement);

      currentIndex++;
  }
}




loadSuccesses();


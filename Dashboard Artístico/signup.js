
const form = document.querySelector('form');
window.handleSubmit = handleSubmit;



async function handleSubmit(event) {
    event.preventDefault();
    const datas = document.querySelectorAll('.form-control');
    const Nome = datas[1].value;
    const Email = datas[2].value;
    const Senha = datas[3].value;
    const confirmPassword = datas[4].value;
    if (Senha !== confirmPassword) {
        console.log('As senhas não são iguais');
        return;
    }
    console.log(Nome, Email, Senha);
    console.log("Parabéns!! " + datas[3].value + "!");
    const user = Object.fromEntries(new FormData(form));

    console.log(user);
    
    fetch ('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({Nome, Email, Senha}),

        
    })
    .then(response => response.json())
    .then(json => {
        let newjson = JSON.stringify(json);
        newjson = JSON.parse(newjson);
        console.log(newjson);

    })
    .catch(error => console.error('Erro:', error));
    
    
    
    if (Email) {
        location.href = 'login.html';
    } else {
        console.log('Erro ao cadastrar usuário');
    }


    
    }

console.log(window);
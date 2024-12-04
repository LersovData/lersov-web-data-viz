// document.querySelector('#registerForm').addEventListener('submit', function (e) {
//     e.preventDefault();

//     var email = document.querySelector('#email').value;
//     var password = document.querySelector('#password').value;
//     var confirmPassword = document.querySelector('#confirmPassword').value;

//     // Validação básica de senha
//     if (password !== confirmPassword) {
//         alert('As senhas não correspondem!');
//         return;
//     }

//     // Armazenar email e senha no localStorage
//     localStorage.setItem('registeredEmail', email);
//     localStorage.setItem('registeredPassword', password);

//     alert('Cadastro realizado com sucesso!');

//     // Redirecionar para a página de login
//     window.location.href = './site-institucional/index.html';
// });

function entrar() {
    var emailVar = input_email.value;
    var senhaVar = input_senha.value;

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.ID_USUARIO = json.idEmpresa;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.CNPJ_USUARIO = json.cnpj;

                setTimeout(function () {
                    window.location = "./dashboard/dashboard.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {
            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}
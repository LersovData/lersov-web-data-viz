// sessão
function validarSessao() {
    var username = sessionStorage.USERNAME_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var user_nome = document.getElementById("user_nome");
    var user_username = document.getElementById("user_username");

    if (username != null && nome != null) {
        // user_nome.innerHTML = nome;
        // user_username.innerHTML = username;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    // divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    // divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        // divErrosLogin.style.display = "flex";
        // divErrosLogin.innerHTML = texto;
    }
}


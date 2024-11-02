// Função para validar o email
function validarEmail() {
    var email = document.getElementById('email').value;
    var emailValido = /^[^\s@]+@[^\s@]+\.(com|br|school)$/.test(email);

    if (emailValido) {
        document.getElementById('email').style.borderColor = "green";
    } else {
        document.getElementById('email').style.borderColor = "red";
    }
}

// Função para validar o CNPJ
function validarCNPJ() {
    var cnpj = document.getElementById('cnpj').value;
    var cnpjValido = /^\d{14}$/.test(cnpj);

    if (cnpjValido) {
        document.getElementById('cnpj').style.borderColor = "green";
    } else {
        document.getElementById('cnpj').style.borderColor = "red";
    }
}

// Função para mostrar os requisitos da senha
function mostrarRequisitosSenha() {
    document.getElementById("senhaRequisitos").style.display = "block";
}

// Função para ocultar os requisitos da senha
function ocultarRequisitosSenha() {
    document.getElementById("senhaRequisitos").style.display = "none";
}

// Validação de Senha com exibição de requisitos
function validarSenha() {
    var senha = document.getElementById("senha").value;
    var temMinuscula = /[a-z]/.test(senha);
    var temMaiuscula = /[A-Z]/.test(senha);
    var temNumero = /\d/.test(senha);
    var temEspecial = /[\W_]/.test(senha);

    // Exibir os requisitos em vermelho ou verde conforme o usuário digita
    document.getElementById("letraMinuscula").style.color = temMinuscula ? "green" : "red";
    document.getElementById("letraMaiuscula").style.color = temMaiuscula ? "green" : "red";
    document.getElementById("numero").style.color = temNumero ? "green" : "red";
    document.getElementById("caractereEspecial").style.color = temEspecial ? "green" : "red";

    if (temMinuscula && temMaiuscula && temNumero && temEspecial) {
        document.getElementById("senha").style.borderColor = "green";
    } else {
        document.getElementById("senha").style.borderColor = "red";
    }
}

// Função para validar se a senha e a confirmação são iguais
function validarConfirmarSenha() {
    var senha = document.getElementById("senha").value;
    var confirmarSenha = document.getElementById("confirmar_senha").value;

    if (senha === confirmarSenha && senha !== "") {
        document.getElementById("confirmar_senha").style.borderColor = "green";
    } else {
        document.getElementById("confirmar_senha").style.borderColor = "red";
    }
}

// Função para validar o tipo de mercado
function validarMercado() {
    var tipoMercado = document.getElementById("tipo").value;
    if (tipoMercado !== "atacadista") {
        alert("Agradecemos a preferência, mas trabalhamos apenas com mercados atacadistas");
        return false;
    }
    return true;
}

// Função para validar todas as informações no cadastro
function validarInformacoes() {
    validarEmail();
    validarCNPJ();
    validarSenha();
    validarConfirmarSenha();
    if (!validarMercado()) {
        return;
    }

    // Verifica se todos os campos estão verdes (válidos)
    var camposValidos = document.getElementById('email').style.borderColor === "green" &&
                        document.getElementById('cnpj').style.borderColor === "green" &&
                        document.getElementById('senha').style.borderColor === "green" &&
                        document.getElementById('confirmar_senha').style.borderColor === "green";

    if (camposValidos) {
        // Redireciona para a página de login
        window.location.href = "./login.html";
    } else {
        alert("Por favor, corrija os erros e tente novamente.");
    }
}

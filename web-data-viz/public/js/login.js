document.querySelector('#registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;
    var confirmPassword = document.querySelector('#confirmPassword').value;

    // Validação básica de senha
    if (password !== confirmPassword) {
        alert('As senhas não correspondem!');
        return;
    }

    // Armazenar email e senha no localStorage
    localStorage.setItem('registeredEmail', email);
    localStorage.setItem('registeredPassword', password);

    alert('Cadastro realizado com sucesso!');

    // Redirecionar para a página de login
    window.location.href = './site-institucional/index.html';
});

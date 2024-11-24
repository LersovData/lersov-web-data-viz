// função para gerar alertas na tela, 
// ao chamar a função passar nome do icone e o texto que ira aparecer
function alerta(icone, texto) {
    // fazendo o icone e o texto aparecer na tela
    div_alerta.innerHTML = `
        <span class="material-icons">${icone}</span>
        <h3>${texto}</h3>
    `;
    
    div_alerta.style.display = 'flex';

    // depois de 2s ele some
    setTimeout(() => {
        div_alerta.style.display = 'none';
    }, 2000)
}
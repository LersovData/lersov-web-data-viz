function limparSessao() {
    sessionStorage.clear();
    window.location = "./login.html";
}

function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;

    if (email != null) {
        // user_nome.innerHTML = nome;
        // user_username.innerHTML = username;
    } else {
        window.location = "./login.html";
    }
}

function entrar() {
    var emailVar = input_email.value;
    var senhaVar = input_senha.value;

    fetch("/admin/autenticar", {
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
                // sessionStorage.ID_USUARIO = json.idAdm;
                sessionStorage.EMAIL_USUARIO = json.email;

                setTimeout(function () {
                    window.location = "./index.html";
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

function listarKpi() {
    fetch(`/admin/listarKpi/`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                setTimeout(listarKpi(), 2000);
            } else {
                resposta.json().then(function (resposta) {

                    var kpiClientes = resposta[0];
                    totalClientesKpi.innerText = `${kpiClientes.qtdClientes}`;

                    totalSensoresKpi.innerText = `${kpiClientes.qtdSensor}`;
                    totalSensoresInativosKpi.innerText = `${kpiClientes.qtdSensorInativo}`;

                });
                setTimeout(() => listarKpi(), 2000);
            }
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);

        setTimeout(() => listarKpi(), 2000);
    });
}

let proximaAtualizacaoPizza;

function obterDadosGraficoPizza() {
    if (proximaAtualizacaoPizza != undefined) {
        clearTimeout(proximaAtualizacaoPizza);
    }

    fetch(`/admin/listarConosco/`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            // se não tiver dado na primeira consulta, ele fica consultando até achar
            if (response.status == 204) {
                setTimeout(() => obterDadosGraficoPizza(), 2000);
            } else {
                response.json().then(function (resposta) {
                    plotarGraficoPizza(resposta);
                });
            }

        } else {
            alerta('error', 'Você ainda não possui dados para seu gráfico!')
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            alerta('error', `${error.message}: Erro ao obter dados para dashboard!`)
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoPizza(resposta) {
    // console.log("Resposta recebida:", resposta);

    // Criando estrutura para plotar gráfico - labels/legenda
    let labelsPizza = ['Sim', 'Não'];

    // Criando estrutura para plotar gráfico - dados
    let dadosPizza = {
        labels: labelsPizza,
        datasets: [{
            data: [],
        }]
    };

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    var registro = resposta[0];

    dadosPizza.datasets[0].data.push(registro.qtdRespondido);
    dadosPizza.datasets[0].data.push(registro.qtdEspera);

    // Criando estrutura para plotar gráfico - config
    const configPizza = {
        type: 'pie',
        data: dadosPizza,
        options: {
            responsive: true,

        }
    };

    // Adicionando os dados no gráfico criado no HTML
    let myChartPizza = new Chart(
        document.getElementById(`lineChartPizza`),
        configPizza
    );

    setTimeout(() => atualizarGraficoPizza(dadosPizza, myChartPizza), 2000);
}

function atualizarGraficoPizza(dadosPizza, myChartPizza) {
    fetch(`/admin/listarConosco/`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                // console.log('TESTE NOVO REGISTRO', novoRegistro[0].qtdEspera)
                // obterDadosGraficoPizza();

                if ((dadosPizza.datasets[0].data[1] != novoRegistro[0].qtdEspera) || (dadosPizza.datasets[0].data[0] != novoRegistro[0].qtdRespondido)) {
                    // console.log('entrei aqui que o espera mudou')
                    dadosPizza.datasets[0].data[1] = novoRegistro[0].qtdEspera;
                    dadosPizza.datasets[0].data[0] = novoRegistro[0].qtdRespondido;

                    myChartPizza.update();
                }

                proximaAtualizacaoPizza = setTimeout(() => atualizarGraficoPizza(dadosPizza, myChartPizza), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacaoPizza = setTimeout(() => atualizarGraficoPizza(dadosPizza, myChartPizza), 2000);
        }
    })
        .catch(function (error) {
            alerta('error', `${error.message}: Erro ao obter novos dados!`)
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
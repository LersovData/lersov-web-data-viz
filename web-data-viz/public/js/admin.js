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
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        // console.log(registro.dtHora);
        // labelsPizza.push(registro.dtHora); // Inserindo as legendas no label
        dadosPizza.datasets[0].data.push(registro.qtdRespondido);
        dadosPizza.datasets[0].data.push(registro.qtdEspera);
    }

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
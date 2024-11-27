// Uma função responsável por iniciar os gráficos
function chamarGraficos() {
    // quando tiver login, substituir o 1 pelo id do sessionStorage
    var idEmpresa = 1;
    var idCorredor = 1;

    obterDadosGraficoSetor(idEmpresa);
    obterDadosGraficoCorredor(idEmpresa, idCorredor);
    obterDadosGraficoCalor(idEmpresa, idCorredor);

    listarTotalPessoasKpi(idEmpresa);
    listarSetorPopularKpi(idEmpresa);
    listarCorredorMaiorFluxoKpi(idEmpresa);
}

function listarTotalPessoasKpi(idEmpresa) {
    // console.log(`/kpis/listarTotalPessoasKpi/${idEmpresa}`); // Verifique no console a URL da requisição

    fetch(`/kpis/listarTotalPessoasKpi/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) { // se não tiver métrica dessa empresa entra aqui
                console.log('DEU PROBLEMA NA KPI')
                throw "Nenhum resultado encontrado!!";
                setTimeout(listarTotalPessoasKpi(idEmpresa), 2000);

            } else {
                resposta.json().then(function (resposta) {
                    // console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var totalKpi = resposta[0].fluxoTotal;
                    totalPessoasCardKpi.innerText = `${totalKpi}`;


                });
                setTimeout(() => listarTotalPessoasKpi(idEmpresa), 2000);
            }
        } else {
            throw ('Houve um erro na API!');


        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
        setTimeout(() => listarTotalPessoasKpi(idEmpresa), 2000);
    });
}

function listarSetorPopularKpi(idEmpresa) {
    // console.log(`/kpis/listarSetorPopularKpi/${idEmpresa}`); // Verifique no console a URL da requisição

    fetch(`/kpis/listarSetorPopularKpi/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) { // se não tiver métrica dessa empresa entra aqui
                console.log('DEU PROBLEMA NA KPI SETOR')
                throw "Nenhum resultado encontrado!!";
                setTimeout(() => listarSetorPopularKpi(idEmpresa), 2000);

            } else {
                resposta.json().then(function (resposta) {
                    // console.log("Dados recebidos DO SETOR: ", JSON.stringify(resposta));

                    var setorKpi = resposta[0].setor;
                    if (setorPopular.innerText !== `${setorKpi}`) {
                        setorPopular.innerText = `${setorKpi}`; // Atualiza se o valor mudar
                    }

                });
                setTimeout(() => listarSetorPopularKpi(idEmpresa), 2000);
            }
        } else {
            throw ('Houve um erro na API!');


        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
        setTimeout(() => listarSetorPopularKpi, 2000);
    });
}

function listarCorredorMaiorFluxoKpi(idEmpresa) {

    fetch(`/kpis/listarCorredorMaiorFluxo/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) { // se não tiver métrica dessa empresa entra aqui
                console.log('DEU PROBLEMA NA KPI SETOR')
                throw "Nenhum resultado encontrado!!";
                setTimeout(() => listarCorredorMaiorFluxoKpi(idEmpresa), 2000);

            } else {
                resposta.json().then(function (resposta) {
                    // console.log("Dados recebidos DO SETOR: ", JSON.stringify(resposta));

                    var corredorKpi = resposta[0].idCorredor;
                    corredorMaiorFluxo.innerText = `${corredorKpi}`;

                });
                setTimeout(() => listarCorredorMaiorFluxoKpi(idEmpresa), 2000);
            }
        } else {
            throw ('Houve um erro na API!');


        }
    }).catch(function (resposta) {
        console.error(resposta);
        // finalizarAguardar();
        setTimeout(() => listarCorredorMaiorFluxoKpi(idEmpresa), 2000);
    });
}

// CONFIGURAÇÃO DOS GRÁFICOS DO >>>SETOR<<<
let proximaAtualizacaoSetor;

function obterDadosGraficoSetor(idEmpresa) {
    if (proximaAtualizacaoSetor != undefined) {
        clearTimeout(proximaAtualizacaoSetor);
    }

    fetch(`/dados/listarDadosSetor/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            // se não tiver dado na primeira consulta, ele fica consultando até achar
            if (response.status == 204) {
                setTimeout(() => obterDadosGraficoSetor(idEmpresa), 2000);
            } else {
                response.json().then(function (resposta) {
                    // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();

                    plotarGraficoSetor(idEmpresa, resposta);
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

function plotarGraficoSetor(idEmpresa, resposta) {
    // console.log(`AQUI Ó: ${JSON.stringify(resposta)}`);
    // console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels/legenda
    let labelsSetor = [];

    // Criando estrutura para plotar gráfico - dados
    let dadosSetor = {
        labels: labelsSetor,
        datasets: [{
            label: 'Número de pessoas',
            data: [],
            fill: false,
            backgroundColor: 'rgb(18,26,81)',
            borderColor: 'rgb(18,26,81)',
            tension: 0.1
        }]
    };

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        // console.log(registro.dtHora);

        labelsSetor.push(registro.dtHora); // Inserindo as legendas no label
        dadosSetor.datasets[0].data.push(registro.totalFluxo); // Inserindo os dados no data
    }

    // Criando estrutura para plotar gráfico - config
    const configSetor = {
        type: 'bar',
        data: dadosSetor,
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '(Horário)',
                        font: {
                            size: 12
                        }
                    },
                    beginAtZero: true
                },
                y: {
                    title: {
                        display: true,
                        text: '(Fluxo)',
                        font: {
                            size: 12
                        }
                    },
                    beginAtZero: true
                }
            }
        }
    };

    // Adicionando os dados no gráfico criado no HTML
    let myChartSetor = new Chart(
        document.getElementById(`lineChartSetor`),
        configSetor
    );

    setTimeout(() => atualizarGraficoSetor(idEmpresa, dadosSetor, myChartSetor), 2000);
}

function atualizarGraficoSetor(idEmpresa, dadosSetor, myChartSetor) {
    fetch(`/dados/listarDadosSetor/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                // obterDadosGraficoSetor(idEmpresa);

                if ((novoRegistro[0].dtHora == dadosSetor.labels[dadosSetor.labels.length - 1]) && (dadosSetor.datasets[0].data[dadosSetor.labels.length - 1] == novoRegistro[0].totalFluxo)) {
                    // Entra aqui se os dados do grafico forem iguais ao do banco ele nao faz nada
                    // console.log('Já está atualizado!!!');
                } else if ((novoRegistro[0].dtHora == dadosSetor.labels[dadosSetor.labels.length - 1]) && (dadosSetor.datasets[0].data[dadosSetor.labels.length - 1] != novoRegistro[0].totalFluxo)) {
                    // Entra aqui se o horário da captura do dado for igual mas o dado foi alterado (passou mais uma pessoa)

                    // Atualizamos o gráfico com o novo dado do banco
                    dadosSetor.datasets[0].data[dadosSetor.labels.length - 1] = novoRegistro[0].totalFluxo;

                    myChartSetor.update();
                } else if ((novoRegistro[0].dtHora != dadosSetor.labels[dadosSetor.labels.length - 1]) && (dadosSetor.datasets[0].data[dadosSetor.labels.length - 1] != novoRegistro[0].totalFluxo)) {
                    // Entra aqui se o passou uma pessoa e o horário é diferente do gráfico

                    // dadosSetor.labels.shift(); // apagar o primeiro
                    dadosSetor.labels.push(novoRegistro[0].dtHora); // incluir um novo momento

                    myChartSetor.update();
                }

                proximaAtualizacaoSetor = setTimeout(() => atualizarGraficoSetor(idEmpresa, dadosSetor, myChartSetor), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacaoSetor = setTimeout(() => atualizarGraficoSetor(idEmpresa, dadosSetor, myChartSetor), 2000);
        }
    })
        .catch(function (error) {
            alerta('error', `${error.message}: Erro ao obter novos dados!`)
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

// CONFIGURAÇÃO DOS GRÁFICOS DO  CORREDOR
let proximaAtualizacaoCorredor;

function obterDadosGraficoCorredor(idEmpresa, idCorredor) {
    if (proximaAtualizacaoCorredor != undefined) {
        clearTimeout(proximaAtualizacaoCorredor);
    }

    fetch(`/dados/listarDadosCorredor/${idEmpresa}/${idCorredor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            // se não tiver dado na primeira consulta, ele fica consultando até achar
            if (response.status == 204) {
                setTimeout(() => obterDadosGraficoCorredor(idEmpresa, idCorredor), 2000);
            } else {
                response.json().then(function (resposta) {
                    // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();

                    plotarGraficoCorredor(idEmpresa, idCorredor, resposta);

                });
            }
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoCorredor(idEmpresa, idCorredor, resposta) {
    let labelsCorredor = [];

    // Criando estrutura para plotar gráfico - dados
    let dadosCorredor = {
        labels: labelsCorredor,
        datasets: [{
            label: 'Corredor 1',
            data: [],
            fill: false,
            backgroundColor: 'rgb(18,26,81)',
            borderColor: 'rgb(18,26,81)',
            tension: 0.1
        },
        {
            label: 'Corredor 2',
            data: [],
            fill: false,
            backgroundColor: 'rgb(227, 61, 148)',
            borderColor: 'rgb(227, 61, 148)',
            tension: 0.1
        }]
    };

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labelsCorredor.push(registro.dtHora);
        dadosCorredor.datasets[0].data.push(registro.totalFluxo);

        dadosCorredor.datasets[1].data.push(registro.totalFluxo);
    }

    // Criando estrutura para plotar gráfico - config
    const configCorredor = {
        type: 'line',
        data: dadosCorredor,
    };

    // Adicionando gráfico criado em div na tela
    let myChartCorredor = new Chart(
        document.getElementById(`lineChartCorredor`),
        configCorredor
    );

    setTimeout(() => atualizarGraficoCorredor(idEmpresa, idCorredor, dadosCorredor, myChartCorredor), 2000);
}

function atualizarGraficoCorredor(idEmpresa, idCorredor, dadosCorredor, myChartCorredor) {

    fetch(`/dados/listarDadosCorredor/${idEmpresa}/${idCorredor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                // obterDadosGraficoCorredor(idEmpresa);

                if ((novoRegistro[0].dtHora == dadosCorredor.labels[dadosCorredor.labels.length - 1]) && (dadosCorredor.datasets[0].data[dadosCorredor.labels.length - 1] == novoRegistro[0].totalFluxo)) {
                    // Entra aqui se os dados do grafico forem iguais ao do banco ele nao faz nada
                    // console.log('Já está atualizado!!!');
                } else if ((novoRegistro[0].dtHora == dadosCorredor.labels[dadosCorredor.labels.length - 1]) && (dadosCorredor.datasets[0].data[dadosCorredor.labels.length - 1] != novoRegistro[0].totalFluxo)) {
                    // Entra aqui se o horário da captura do dado for igual mas o dado foi alterado (passou mais uma pessoa)

                    // Atualizamos o gráfico com o novo dado do banco
                    dadosCorredor.datasets[0].data[dadosCorredor.labels.length - 1] = novoRegistro[0].totalFluxo;

                    dadosCorredor.datasets[1].data[dadosCorredor.labels.length - 1] = novoRegistro[0].totalFluxo;

                    myChartCorredor.update();
                } else if ((novoRegistro[0].dtHora != dadosCorredor.labels[dadosCorredor.labels.length - 1]) && (dadosCorredor.datasets[0].data[dadosCorredor.labels.length - 1] != novoRegistro[0].totalFluxo)) {
                    // Entra aqui se o passou uma pessoa e o horário é diferente do gráfico

                    // dadosCorredor.labels.shift(); // apagar o primeiro
                    dadosCorredor.labels.push(novoRegistro[0].dtHora); // incluir um novo momento

                    myChartCorredor.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacaoCorredor = setTimeout(() => atualizarGraficoCorredor(idEmpresa, idCorredor, dadosCorredor, myChartCorredor), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacaoCorredor = setTimeout(() => atualizarGraficoCorredor(idEmpresa, idCorredor, dadosCorredor, myChartCorredor), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}


// CONFIGURAÇÃO DOS GRÁFICOS DE >>>CALOR<<<
var heatmapInstance = h337.create({
    container: document.getElementById('heatmapContainer'),
    radius: 70,
    maxOpacity: 0.5,
    blur: 1,
});

function obterDadosGraficoCalor(idEmpresa, idCorredor) {
    fetch(`/dados/listarDadosCorredor/${idEmpresa}/${idCorredor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            if (response.status == 204) {
                setTimeout(() => obterDadosGraficoCalor(idEmpresa, idCorredor), 2000);
            } else {
                response.json().then(function (resposta) {
                    // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();
    
                    plotarGraficoCalor(idEmpresa, idCorredor, resposta);
                });
            }
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoCalor(idEmpresa, idCorredor, resposta) {
    // dados (x, y, valor de intensidade)
    const dataHeatmap = {
        min: 0,
        max: 2,
        data: []
    };

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        // Informações para o mapa de calor, passando os eixos x,y e o value que possui o dado do banco
        var x = 125;
        var y = 100 + (i % 5) * 50;
        var value = registro.totalFluxo;

        // Aqui ele manda para o data do mapa de calor com as informações acima
        dataHeatmap.data.push({ x, y, value });

        // Se o valor que vem do banco for MAIOR que o max, ele atualiza pro maxímo ser o valor mais alto
        if (value > dataHeatmap.max) {
            dataHeatmap.max = value;
        }
    }

    // adicionando os dados ao heatmap
    heatmapInstance.setData(dataHeatmap);

    setTimeout(() => obterDadosGraficoCalor(idEmpresa, idCorredor), 2000);
}
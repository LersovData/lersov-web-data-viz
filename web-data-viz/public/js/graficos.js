// Uma função responsável por iniciar os gráficos
// // variaveis globais
var idCorredor = ''
var setor = ''

function selecionarCorredor(corredorSelecionado) {

    if(corredorSelecionado == '1' || !corredorSelecionado ){
        idCorredor = '1'
    }else if(corredorSelecionado == '2'){
        idCorredor = '2'
    }else if(corredorSelecionado == '3'){
        idCorredor = '3'
    }

    console.log(` NUMERO DO IDCORREDOR: ${corredorSelecionado}`)
    console.log(`Teste Corredor ${corredorSelecionado}`)
    selecionarSetor()

}
// CONSETAR OS PARAMETROS QUE É 10
function selecionarSetor() {
    
    console.log(idCorredor)
    console.log(`TESTE PARAMETRO DO IDCORREDOR:${idCorredor}`)

    if (idCorredor == '1' || !idCorredor) {
        setor = 'Limpeza e higiêne'
    } else if (idCorredor == '2') {
        setor = 'Adega'
    } else if (idCorredor == '3') {
        setor = 'Massas'
    }

    chamarGraficos()
}

function chamarGraficos() {
    // quando tiver login, substituir o 1 pelo id do sessionStorage
    var idEmpresa = 1;
    

    obterDadosGraficoSetor(idEmpresa);
    obterDadosGraficoCorredor(idEmpresa, idCorredor, setor);
    obterDadosGraficoCalor(idEmpresa);

    listarTotalPessoasKpi(idEmpresa);
    listarSetorPopularKpi(idEmpresa);
    listarCorredorMaiorFluxoKpi(idEmpresa);
}

function listarTotalPessoasKpi(idEmpresa) {

    fetch(`/kpis/listarTotalPessoasKpi/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) { // se não tiver métrica dessa empresa entra aqui
                console.log('DEU PROBLEMA NA KPI')
                throw "Nenhum resultado encontrado!!";
                setTimeout(listarTotalPessoasKpi(idEmpresa), 2000);

            } else {
                resposta.json().then(function (resposta) {
                   

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
        
        setTimeout(() => listarTotalPessoasKpi(idEmpresa), 2000);
    });
}

function listarSetorPopularKpi(idEmpresa) {
   

    fetch(`/kpis/listarSetorPopularKpi/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) { // se não tiver métrica dessa empresa entra aqui
                console.log('DEU PROBLEMA NA KPI SETOR')
                throw "Nenhum resultado encontrado!!";
                setTimeout(() => listarSetorPopularKpi(idEmpresa), 2000);

            } else {
                resposta.json().then(function (resposta) {
                    

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

        console.log("Resposta recebida:", resposta);


        // Criando estrutura para plotar gráfico - labels/legenda
        let labelsSetor = [];

        // Criando estrutura para plotar gráfico - dados
        let dadosSetor = {
            labels: labelsSetor,
            datasets: [{
                label: 'Limpeza e higiêne',
                data: [],
                fill: false,
                backgroundColor: 'rgb(18,26,81)',
                borderColor: 'rgb(18,26,81)',
                tension: 0.1
            },
            {
                label: 'Massas',
                data: [],
                fill: false,
                backgroundColor: 'rgb(18,26,230)',
                borderColor: 'rgb(18,26,81)',
                tension: 0.1
            },
            {
                label: 'Adega',
                data: [],
                fill: false,
                backgroundColor: 'rgb(3,187,133)',
                borderColor: 'rgb(3,187,133)',
                tension: 0.1
            }]
        };

        // Inserindo valores recebidos em estrutura para plotar o gráfico
        for (i = 0; i < resposta.length; i++) {
            var registro = resposta[i];
            // console.log(registro.dtHora);
            labelsSetor.push(registro.dtHora); // Inserindo as legendas no label
            dadosSetor.datasets[0].data.push(registro.fluxo_limpeza); 
            dadosSetor.datasets[1].data.push(registro.fluxo_massas); 
            dadosSetor.datasets[2].data.push(registro.fluxo_adega);

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

                    console.log('TESTE NOVO REGISTRO',novoRegistro)
                    // obterDadosGraficoSetor(idEmpresa);

                    if ((novoRegistro[0].dtHora == dadosSetor.labels[dadosSetor.labels.length - 1]) && (dadosSetor.datasets[0].data[dadosSetor.labels.length - 1] == novoRegistro[0].fluxo_limpeza)) {
                        // Entra aqui se os dados do grafico forem iguais ao do banco ele nao faz nada
                        // console.log('Já está atualizado!!!');
                    } else if ((novoRegistro[0].dtHora == dadosSetor.labels[dadosSetor.labels.length - 1]) && (dadosSetor.datasets[0].data[dadosSetor.labels.length - 1] != novoRegistro[0].fluxo_limpeza)) {
                        // Entra aqui se o horário da captura do dado for igual mas o dado foi alterado (passou mais uma pessoa)

                        // Atualizamos o gráfico com o novo dado do banco
                        dadosSetor.datasets[0].data[dadosSetor.labels.length - 1] = novoRegistro[0].fluxo_limpeza;

                        myChartSetor.update();
                    } else if ((novoRegistro[0].dtHora != dadosSetor.labels[dadosSetor.labels.length - 1]) && (dadosSetor.datasets[0].data[dadosSetor.labels.length - 1] != novoRegistro[0].fluxo_limpeza)) {
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
    // VARIÁVEL DO GRÁFICO CORREDOR
    let myChartCorredor

    function obterDadosGraficoCorredor(idEmpresa) {
        idCorredor = idCorredor;
        setor = setor;

        if(myChartCorredor){
            myChartCorredor.destroy()
        }
        if (proximaAtualizacaoCorredor != undefined) {
            clearTimeout(proximaAtualizacaoCorredor);
        }

        fetch(`/dados/listarDadosCorredor/${idEmpresa}/${idCorredor}/${setor}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {

                // se não tiver dado na primeira consulta, ele fica consultando até achar
                if (response.status == 204) {
                    setTimeout(() => obterDadosGraficoCorredor(idEmpresa, idCorredor, setor), 2000);
                } else {
                    response.json().then((resposta) => {
                        console.log('RESPOsta OBTER DADOS CORREDOR===========', resposta)
                        // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                        
                        resposta.reverse();
                        
                        plotarGraficoCorredor(idEmpresa, idCorredor, setor, resposta)   
                        console.log(`RESPOSTA OBTER DADOS CORREDOR:`, resposta)
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



function plotarGraficoCorredor(idEmpresa, idCorredor, setor, resposta) {
    console.log('ENTRANDO NO PLOTAR CORREDOR', idCorredor, setor)
    
    
    let labelsCorredor = [];

    // Criando estrutura para plotar gráfico - dados
    let dadosCorredor = {
        labels: labelsCorredor,
        datasets: [{
            label: '',
            data: [],
            fill: false,
            backgroundColor: 'rgb(18,26,81)',
            borderColor: 'rgb(18,26,81)',
            tension: 0.1
        }]
    };

    
    if(setor == 'Massas'){
        dadosCorredor.datasets[0].backgroundColor = 'rgb(18,26,230)'
        dadosCorredor.datasets[0].borderColor = 'rgb(18,26,230)'
    }else if(setor == 'Adega'){
        dadosCorredor.datasets[0].backgroundColor = 'rgb(3,187,133)' 
        dadosCorredor.datasets[0].borderColor = 'rgb(3,187,133)' 
    }

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labelsCorredor.push(registro.dtHora);
        dadosCorredor.datasets[0].data.push(registro.totalFluxo);
        dadosCorredor.datasets[0].label = `Corredor ${registro.idCorredor} - ${registro.setor}`
    }


    // Criando estrutura para plotar gráfico - config
    const configCorredor = {
        type: 'line',
        data: dadosCorredor,
    };
    
    myChartCorredor = new Chart(
        document.getElementById(`lineChartCorredor`),
        configCorredor
    );

    
    setTimeout(() => atualizarGraficoCorredor(idEmpresa, idCorredor, setor, dadosCorredor, myChartCorredor), 2000);
}

function atualizarGraficoCorredor(idEmpresa, idCorredor, setor, dadosCorredor, myChartCorredor) {
    console.log('ENTRANDO NO ATUALIZAR CORREDOR:', idCorredor, setor, dadosCorredor)
    idCorredor = idCorredor;
    setor = setor;

    fetch(`/dados/listarDadosCorredor/${idEmpresa}/${idCorredor}/${setor}`, { cache: 'no-store' }).then(function (response) {
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
                    
                    myChartCorredor.update();
                } else if ((novoRegistro[0].dtHora != dadosCorredor.labels[dadosCorredor.labels.length - 1]) && (dadosCorredor.datasets[0].data[dadosCorredor.labels.length - 1] != novoRegistro[0].totalFluxo)) {
                    // Entra aqui se o passou uma pessoa e o horário é diferente do gráfico
                    // dadosCorredor.labels.shift(); // apagar o primeiro
                    dadosCorredor.labels.push(novoRegistro[0].dtHora); // incluir um novo momento

                    myChartCorredor.update();
                }
                // console.log(`ESSA É A RESPOSTA DO ATUALIZAR CORREDOR:`, response)
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacaoCorredor = setTimeout(() => atualizarGraficoCorredor(idEmpresa, idCorredor, setor, dadosCorredor, myChartCorredor), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacaoCorredor = setTimeout(() => atualizarGraficoCorredor(idEmpresa, idCorredor, setor, dadosCorredor, myChartCorredor), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}


// CONFIGURAÇÃO DOS GRÁFICOS DE >>>CALOR<<<
var corGrafico = 'blue'; 
var metricaAlto;
var metricaMedio;
var metricaBaixo;

var heatmapInstance = h337.create({
    container: document.getElementById('heatmapContainer'),
    radius: 50,
    maxOpacity: 0.7,
    blur: 1,
    gradient: {
        '.5': corGrafico,
        '.8': corGrafico,
        '.95': corGrafico
    }
});

function atualizarCorGradient(cor) {
    heatmapInstance.configure({
        gradient: {
            '.5': cor,
            '.8': cor,
            '.95': cor
        }
    });
}

function obterDadosGraficoCalor(idEmpresa) {
    // console.log('AQUIIII' + heatmapInstance.gradient[0]);
    idCorredor = idCorredor;
    setor = setor;
    
    fetch(`/dados/listarDadosCorredor/${idEmpresa}/${idCorredor}/${setor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            if (response.status == 204) {
                setTimeout(() => obterDadosGraficoCalor(idEmpresa, idCorredor, setor), 2000);
            } else {
                console.log(`RESPONSE DO OBTER DADOS CALOR:`, response)
                response.json().then(function (resposta) {
                    // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    // resposta.reverse();

                    // console.log(' metricaaaaaa n ' + metricaAlto + 'bancooo ' + resposta[0].totalFluxo)
                    if (resposta[0].totalFluxo < metricaMedio) {
                        corGrafico = 'blue';
                    } else if (resposta[0].totalFluxo < metricaAlto) {
                        corGrafico = 'orange';
                    } else {
                        corGrafico = 'red';
                    }

                    atualizarCorGradient(corGrafico);

                    plotarGraficoCalor(idEmpresa, idCorredor, setor, resposta);
                    // console.log(`RESPOSTA DO OBTER DADOS CALOR:`, resposta)
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

function plotarGraficoCalor(idEmpresa, idCorredor, setor, resposta) {
    // dados (x, y, valor de intensidade)
    const dataHeatmap = {
        min: 0,
        max: resposta.totalFluxo,
        data: []
    };
    // console.log("AQUI É O DATAHEATMAP",dataHeatmap)
    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        // Informações para o mapa de calor, passando os eixos x,y e o value que possui o dado do banco
        
        if (registro.setor == 'Adega') {
            var posicao = 290;
        } else if (registro.setor == 'Massas') {
            var posicao = 450;
        } else {
            var posicao = 125;
        }

        var x = posicao;
        var y = 100 + (i % 5) * 55;
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
    // console.log(`ESSA É A RESPOSTA DO CALOR :`, resposta)

        // console.log('IDCORREDOR E SETOR NO CALOR',idCorredor, setor)

        setTimeout(() => obterDadosGraficoCalor(idEmpresa, idCorredor, setor), 5000);
}


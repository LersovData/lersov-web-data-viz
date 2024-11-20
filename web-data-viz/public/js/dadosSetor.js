let proximaAtualizacaoSetor;


function obterDadosGraficoSetor() {
    var idEmpresa = 1;

    if (proximaAtualizacaoSetor != undefined) {
        clearTimeout(proximaAtualizacaoSetor);
    }

    fetch(`/dados/listarDadosSetor`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
          response.json().then(function (resposta) {
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            resposta.reverse();

            plotarGraficoSetor(resposta, idEmpresa);

          });
        } else {
          console.error('Nenhum dado encontrado ou erro na API');
        }
      })
        .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoSetor(resposta, idEmpresa) {
    console.log(`AQUI Ó: ${JSON.stringify(resposta)}`);
    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
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
        console.log(registro.dtHora);

        labelsSetor.push(registro.dtHora);
        dadosSetor.datasets[0].data.push(registro.totalFluxo);
    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labelsSetor)
    console.log('Dados:')
    console.log(dadosSetor.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const configSetor = {
        type: 'bar',
        data: dadosSetor,
    };

    // Adicionando gráfico criado em div na tela
    let myChartSetor = new Chart(
        document.getElementById(`lineChartSetor`),
        configSetor
    );

    console.log('OIII ' + dadosSetor.datasets[0].data[1])
    console.log('OI ' + registro.totalFluxo)

    setTimeout(() => atualizarGraficoSetor(idEmpresa, dadosSetor, myChartSetor), 2000);
}

function atualizarGraficoSetor(idEmpresa, dadosSetor, myChartSetor) {
    console.log('invocando grafico setor')

    fetch(`/dados/tempo-real-setor`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                obterDadosGraficoSetor(idEmpresa);
                // alertar(novoRegistro, idAquario);
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dadosSetor);

                // let avisoCaptura = document.getElementById(`avisoCaptura${id}`)
                // avisoCaptura.innerHTML = ""

    

                if ((novoRegistro[0].dtHora == dadosSetor.labels[dadosSetor.labels.length - 1]) && (dadosSetor.datasets[0].data[dadosSetor.labels.length - 1] == novoRegistro[0].totalFluxo)) {
                    console.log('Já está atualizado!!!');
                } else if ((novoRegistro[0].dtHora == dadosSetor.labels[dadosSetor.labels.length - 1]) && (dadosSetor.datasets[0].data[dadosSetor.labels.length - 1] != novoRegistro[0].totalFluxo)) {
               
                    console.log('Nova atualização!!!AQUI');
                    console.log(dadosSetor.datasets[0].data);
                    dadosSetor.datasets[0].data[dadosSetor.labels.length - 1] = novoRegistro[0].totalFluxo;

                    myChartSetor.update();
                } else if ((novoRegistro[0].dtHora != dadosSetor.labels[dadosSetor.labels.length - 1]) && (dadosSetor.datasets[0].data[dadosSetor.labels.length - 1] != novoRegistro[0].totalFluxo)) {

                    console.log('Nova atualização!!!');
                    dadosSetor.labels.shift(); // apagar o primeiro
                    dadosSetor.labels.push(novoRegistro[0].dtHora); // incluir um novo momento

                    myChartSetor.update();
                }


                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoSetor(idEmpresa, dadosSetor, myChartSetor), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoSetor(idEmpresa, dadosSetor, myChartSetor), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

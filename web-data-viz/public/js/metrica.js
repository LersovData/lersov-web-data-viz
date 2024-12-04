// essa função tem como parametro a pagina que ela foi chamada,
// para assim ter um comportamento diferente para cada pagina
function listarMetrica(pagina) {
    // trocar para valor pelo sessionStorage quando login estiver feito
    // var idEmpresa = sessionStorage.ID_EMPRESA;
    var idEmpresa = sessionStorage.ID_USUARIO;

    fetch(`/metricas/listar/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) { // se não tiver métrica dessa empresa entra aqui

                if (pagina == 'metricas') {
                    div_botao.innerHTML = `<button onclick="cadastrarMetrica()" id="btnSalvar">Salvar</button>`;
                } else {
                    window.location = "./metricas.html";
                }
                
            } else {
                resposta.json().then(function (resposta) {
                    // console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var metrica = resposta[0];
                    metricaAlto = metrica.alto;
                    metricaMedio = metrica.medio;
                    metricaBaixo = metrica.baixo;

                    if (pagina == 'metricas') {
                        input_alto.value = metrica.alto;
                        input_medio.value = metrica.medio;
                        input_baixo.value = metrica.baixo;
                        div_botao.innerHTML = `<button onclick="atualizarMetrica()" id="btnSalvar">Atualizar</button>`;
                    } else {
                        metrica_alto.innerText = `- ${metrica.alto}`;
                        metrica_medio.innerText = `- ${metrica.medio}`;
                        metrica_baixo.innerText = `- ${metrica.baixo}`;
                    }

                });
            }
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function cadastrarMetrica() {
    var altoVar = input_alto.value;
    var medioVar = input_medio.value;
    var baixoVar = input_baixo.value;

    // trocar para valor pelo sessionStorage quando login estiver feito
    // var idEmpresa = sessionStorage.ID_EMPRESA;
    var idEmpresa = sessionStorage.ID_USUARIO;

    if (altoVar == '' || medioVar == '' || baixoVar == '') {
        return false;
    } else {
        fetch(`/metricas/cadastrar/${idEmpresa}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                altoServer: altoVar,
                medioServer: medioVar,
                baixoServer: baixoVar
            }),
        })
            .then(function (resposta) {
                // console.log("resposta: ", resposta);

                if (resposta.ok) {
                    // console.log("Métrica realizado com sucesso! Redirecionando para tela atualizada...");

                    alerta("check", "Métrica cadastrada com sucesso!");

                    setTimeout(() => {
                        window.location = "./dashboard.html";
                    }, "2000");

                } else {
                    alerta("error", "Houve um erro ao tentar cadastrar novas métricas!");
                    throw "Houve um erro ao tentar realizar o salvamento das métricas!";
                }
            })
            .catch(function (resposta) {
                alerta("error", "Houve um erro ao tentar cadastrar novas métricas!");
                console.log(`#ERRO: ${resposta}`);
            });

        return false;
    }
}

function atualizarMetrica() {
    var altoVar = input_alto.value;
    var medioVar = input_medio.value;
    var baixoVar = input_baixo.value;

    // trocar para valor pelo sessionStorage quando login estiver feito
    // var idEmpresa = sessionStorage.ID_EMPRESA;
    var idEmpresa = sessionStorage.ID_USUARIO;
    var idMetricaVar = 1;

    if (altoVar == '' || medioVar == '' || baixoVar == '') {
        return false;
    } else {
        fetch(`/metricas/atualizar/${idEmpresa}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                altoServer: altoVar,
                medioServer: medioVar,
                baixoServer: baixoVar,
                idMetricaServer: idMetricaVar
            }),
        })
            .then(function (resposta) {
                // console.log("resposta: ", resposta);

                if (resposta.ok) {
                    // console.log("Métrica atualizada com sucesso! Redirecionando para tela atualizada...");

                    alerta("check", "Métrica atualizada com sucesso!");

                    setTimeout(() => {
                        window.location = "./dashboard.html";
                    }, "2000");
                } else {
                    alerta("error", "Houve um erro ao tentar atualizar as métricas!");
                    throw "Houve um erro ao tentar realizar a atualização das métricas!";
                }
            })
            .catch(function (resposta) {
                alerta("error", "Houve um erro ao tentar atualizar as métricas!");
                console.log(`#ERRO: ${resposta}`);
            });

        return false;
    }
}

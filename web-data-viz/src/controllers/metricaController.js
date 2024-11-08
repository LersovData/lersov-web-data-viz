var metricaModel = require("../models/metricaModel");

function listar(req, res) {
    var idEmpresa = req.params.idEmpresa;

    metricaModel.listar(idEmpresa)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function cadastrar(req, res) {
    // recebendo valores do metricas.html
    var idEmpresa = req.params.idEmpresa;
    var alto = req.body.altoServer;
    var medio = req.body.medioServer;
    var baixo = req.body.baixoServer;

    // valiações para saber se tudo esta preenchido
    if (alto == undefined) {
        res.status(400).send("Seu valor alto está undefined!");
    } else if (medio == undefined) {
        res.status(400).send("Seu valor médio está undefined!");
    } else if (baixo == undefined) {
        res.status(400).send("Sua valor baixo está undefined!");
    } else {
        metricaModel.cadastrar(idEmpresa, alto, medio, baixo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o salvamento! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizar(req, res) {
    // recebendo valores do metricas.html
    var idEmpresa = req.params.idEmpresa;
    var idMetrica = req.body.idMetricaServer;
    var alto = req.body.altoServer;
    var medio = req.body.medioServer;
    var baixo = req.body.baixoServer;

    // valiações para saber se tudo esta preenchido
    if (alto == undefined) {
        res.status(400).send("Seu valor alto está undefined!");
    } else if (medio == undefined) {
        res.status(400).send("Seu valor médio está undefined!");
    } else if (baixo == undefined) {
        res.status(400).send("Sua valor baixo está undefined!");
    } else {
        metricaModel.atualizar(idEmpresa, idMetrica, alto, medio, baixo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o salvamento! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    listar,
    cadastrar,
    atualizar
}
var formularioModel = require("../models/formularioModel");

function listar(req, res) {
    var idEmpresa = req.params.idEmpresa;

    formularioModel.listar(idEmpresa)
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
    // recebendo valores do formularios.html
    var idEmpresa = req.params.idEmpresa;
    var qtdCorredor = req.body.qtdCorredorServer;
    var dtImplementacao = req.body.dtImplementacaoServer;

    // valiações para saber se tudo esta preenchido
    if (qtdCorredor == undefined) {
        res.status(400).send("Seu idEmpresa está undefined!");
    } else if (dtImplementacao == undefined) {
        res.status(400).send("Sua quantidade de corredores está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("Sua data de implementação está undefined!");
    } else {
        formularioModel.cadastrar(idEmpresa, qtdCorredor, dtImplementacao)
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
    cadastrar
}
var dadosModel = require("../models/dadosModel");

function listarDados(req, res){
    dadosModel.listarDados().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })

}


function atualizarDados(req, res) {


    console.log(`Recuperando medidas em tempo real`);

    dadosModel.atualizarDados().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function atualizarDadosPorSetor(req, res) {


    console.log(`Recuperando medidas em tempo real`);

    dadosModel.atualizarDadosSetor().then(function (resultadoSetor) {
        if (resultadoSetor.length > 0) {
            res.status(200).json(resultadoSetor);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    listarDados,
    atualizarDados,
    atualizarDadosPorSetor
}
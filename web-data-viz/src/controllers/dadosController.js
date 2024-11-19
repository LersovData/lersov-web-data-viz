var dadosModel = require("../models/dadosModel");

function listarDadosSetor(req, res){
    dadosModel.listarDadosSetor().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })

}

function listarDadosCorredor(req, res){
    dadosModel.listarDadosCorredor().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function atualizarDadosCorredor(req, res) {

    
    console.log(`Recuperando medidas em tempo real`);

    dadosModel.atualizarDadosCorredor().then(function (resultado) {
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

function atualizarDadosSetor(req, res) {


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

function atualizarDadosCalor(req, res) {


    console.log(`Recuperando medidas em tempo real`);

    dadosModel.atualizarDadosCalor().then(function (resultadoCalor) {
        if (resultadoCalor.length > 0) {
            res.status(200).json(resultadoCalor);
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
    listarDadosSetor,
    listarDadosCorredor,
    atualizarDadosCorredor,
    atualizarDadosSetor,
    atualizarDadosCalor
}
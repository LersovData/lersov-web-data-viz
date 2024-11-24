var dadosModel = require("../models/dadosModel");

function listarDadosSetor(req, res){
    dadosModel.listarDadosSetor().then(function(resultado){
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function listarDadosCorredor(req, res){
    dadosModel.listarDadosCorredor().then(function(resultado){
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

// function listarDadosCalor(req, res){
//     dadosModel.listarDadosCalor().then(function(resultado){
//         if (resultado.length > 0) {
//             res.status(200).json(resultado);
//         } else {
//             res.status(204).send("Nenhum resultado encontrado!")
//         }
//     }).catch(function(erro){
//         res.status(500).json(erro.sqlMessage);
//     })
// }

module.exports = {
    listarDadosSetor,
    listarDadosCorredor,
    // listarDadosCalor
}
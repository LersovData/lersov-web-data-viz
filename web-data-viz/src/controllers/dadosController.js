var dadosModel = require("../models/dadosModel");

function listarDadosSetor(req, res){
    var idEmpresa = req.params.idEmpresa;

    dadosModel.listarDadosSetor(idEmpresa).then(function(resultado){
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
    var idEmpresa = req.params.idEmpresa;
    var idCorredor = req.params.idCorredor;

    dadosModel.listarDadosCorredor(idEmpresa, idCorredor).then(function(resultado){
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
//     var idEmpresa = req.params.idEmpresa;
// 
//     dadosModel.listarDadosCalor(idEmpresa).then(function(resultado){
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
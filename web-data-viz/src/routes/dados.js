var express = require("express");
var router = express.Router();

var dadosController = require("../controllers/dadosController");
// rotas do setor
router.get("/listarDadosSetor/:idEmpresa", function (req, res) {
    dadosController.listarDadosSetor(req, res);
});

router.get("/listarDadosCorredor/:idEmpresa/:idCorredor/:setor", function (req, res) {
    dadosController.listarDadosCorredor(req, res);
});

module.exports = router;
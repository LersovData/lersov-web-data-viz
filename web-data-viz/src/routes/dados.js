var express = require("express");
var router = express.Router();

var dadosController = require("../controllers/dadosController");

router.get("/listarDadosSetor", function (req, res) {
    dadosController.listarDadosSetor(req, res);
});

router.get("/listarDadosCorredor", function (req, res) {
    dadosController.listarDadosCorredor(req, res);
});

router.get("/tempo-real-setor", function (req, res) {
    dadosController.atualizarDadosSetor(req, res);
});

router.get("/tempo-real-corredor", function (req, res) {
    dadosController.atualizarDadosCorredor(req, res);
});


router.get("/tempo-real-calor", function (req, res) {
    dadosController.atualizarDadosCalor(req, res);
});

module.exports = router;
var express = require("express");
var router = express.Router();

var dadosController = require("../controllers/dadosController");

router.get("/listarDados", function (req, res) {
    dadosController.listarDados(req, res);
});

router.get("/tempo-real", function(req, res){
    dadosController.atualizarDados(req, res);
});

module.exports = router;
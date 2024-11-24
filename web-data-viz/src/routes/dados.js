var express = require("express");
var router = express.Router();

var dadosController = require("../controllers/dadosController");
// rotas do setor
router.get("/listarDadosSetor", function (req, res) {
    dadosController.listarDadosSetor(req, res);
});

router.get("/listarDadosCorredor", function (req, res) {
    dadosController.listarDadosCorredor(req, res);
});

// router.get("/listarDadosCalor", function (req, res) {
//     dadosController.listarDadosCorredor(req, res);
// });

module.exports = router;
var express = require("express");
var router = express.Router();

var metricaController = require("../controllers/metricaController");

router.get("/listar/:idEmpresa", function (req, res) {
    metricaController.listar(req, res);
});

router.post("/cadastrar/:idEmpresa", function (req, res) {
    metricaController.cadastrar(req, res);
});

router.put("/atualizar/:idEmpresa", function (req, res) {
    metricaController.atualizar(req, res);
});

module.exports = router;
var express = require("express");
var router = express.Router();

var formularioController = require("../controllers/formularioController");

router.get("/listar/:idEmpresa", function (req, res) {
    formularioController.listar(req, res);
});

router.post("/cadastrar/:idEmpresa", function (req, res) {
    formularioController.cadastrar(req, res);
});

module.exports = router;
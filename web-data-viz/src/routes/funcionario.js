var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar/:idEmpresa", function (req, res) {
    funcionarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    funcionarioController.autentificar(req, res);
});

router.get("/listar/:idEmpresa", function (req, res) {
    funcionarioController.listar(req, res);
});

module.exports = router;
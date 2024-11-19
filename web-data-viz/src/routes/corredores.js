var express = require("express");
var router = express.Router();

var corredorController = require("../controllers/corredorController");

router.get("/listar/:idEmpresa", function (req, res) {
    corredorController.listar(req, res);
});

module.exports = router;
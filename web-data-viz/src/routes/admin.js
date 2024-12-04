var express = require("express");
var router = express.Router();

var adminController = require("../controllers/adminController");

router.get("/listarKpi/", function (req, res) {
    adminController.listarKpi(req, res);
});

router.get("/listarConosco/", function (req, res) {
    adminController.listarConosco(req, res);
});

router.post("/cadastrarConosco/", function (req, res) {
    adminController.cadastrarConosco(req, res);
});

router.post("/autenticar", function (req, res) {
    adminController.autenticar(req, res);
});

module.exports = router;
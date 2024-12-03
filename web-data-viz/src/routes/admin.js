var express = require("express");
var router = express.Router();

var adminController = require("../controllers/adminController");

router.get("/listarKpi/", function (req, res) {
    adminController.listarKpi(req, res);
});

router.get("/listarConosco/", function (req, res) {
    adminController.listarConosco(req, res);
});

module.exports = router;
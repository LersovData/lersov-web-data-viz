var express = require("express");
var router = express.Router();

var kpiController = require("../controllers/kpiController");

router.get("/listarTotalPessoasKpi/:idEmpresa", function (req, res) {
    kpiController.listarTotalPessoasKpi(req, res);
});

router.get("/listarSetorPopularKpi/:idEmpresa", function (req, res) {
    kpiController.listarSetorPopularKpi(req, res);
});

router.get("/listarCorredorMaiorFluxo/:idEmpresa", function (req, res) {
    kpiController.listarCorredorMaiorFluxo(req, res);
});



module.exports = router;
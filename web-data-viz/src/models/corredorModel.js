var database = require("../database/config")

function listar(idEmpresa) {
    console.log("ACESSEI O METRICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT
        c.idCorredor,
        c.setor,
        s.idSensor,
        s.estadoSensor
        FROM corredor AS c
        JOIN sensor AS s
        ON s.fkCorredor = c.idCorredor
        WHERE c.fkEmpresa = '${idEmpresa}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar
};
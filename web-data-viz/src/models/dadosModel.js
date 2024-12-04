var database = require("../database/config");

function listarDadosSetor(idEmpresa) {
    var instrucao = `
    SELECT
        HOUR(d.dtHora) AS dtHora,
        SUM(CASE WHEN c.setor = 'Limpeza e Higiene' THEN d.fluxoDePessoas ELSE 0 END) AS fluxo_limpeza,
        SUM(CASE WHEN c.setor = 'Massas' THEN d.fluxoDePessoas ELSE 0 END) AS fluxo_massas,
        SUM(CASE WHEN c.setor = 'Adega' THEN d.fluxoDePessoas ELSE 0 END) AS fluxo_adega
        FROM dadosSensor AS d
        JOIN sensor AS s 
            ON d.fkSensor = s.idSensor
        JOIN corredor AS c
            ON s.fkCorredor = c.idCorredor
        WHERE c.fkEmpresa = ${idEmpresa}
        GROUP BY HOUR(d.dtHora)
        ORDER BY dtHora DESC;

    `;

    console.log("Executando a instrução SQL AAAAAAAAAAAAAA: \n" + instrucao);
    return database.executar(instrucao);
}

function listarDadosCorredor(idEmpresa, idCorredor, setor) {
    var instrucao = `
        SELECT
			c.idCorredor,
            c.setor,
            SUM(d.fluxoDePessoas) AS totalFluxo,
            HOUR(d.dtHora) AS dtHora
            FROM dadosSensor AS d
            JOIN sensor AS s 
                ON d.fkSensor = s.idSensor
            JOIN corredor AS c
                ON s.fkCorredor = c.idCorredor
			WHERE c.fkEmpresa = ${idEmpresa} AND c.idCorredor = ${idCorredor} AND c.setor = '${setor}'
            GROUP BY 
            c.setor,
            HOUR(d.dtHora)
            ORDER BY HOUR(d.dtHora) DESC;
    `;

    console.log("Executando a instrução SQL ========================: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    listarDadosSetor,
    listarDadosCorredor
};
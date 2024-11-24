var database = require("../database/config");

function totalPessoasKpi(idEmpresa) {
    console.log("ACESSEI O KPI MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
       SELECT sum(fluxoDePessoas) as fluxoTotal, C.fkEmpresa
        FROM dadosSensor as D JOIN sensor as S
        ON D.fkSensor = S.idSensor JOIN corredor as C
        ON S.fkCorredor = C.idCorredor
        WHERE fkEmpresa = ${idEmpresa}
        GROUP BY C.fkEmpresa;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function setorPopular(idEmpresa) {
    console.log("ACESSANDO O KPI SETOR POPULAR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT C.setor, sum(fluxoDePessoas) as fluxoTotal, C.fkEmpresa
        FROM dadosSensor as D JOIN sensor as S
        ON D.fkSensor = S.idSensor JOIN corredor as C
        ON S.fkCorredor = C.idCorredor
        WHERE fkEmpresa = ${idEmpresa}
        GROUP BY C.setor, C.fkEmpresa
        ORDER BY fluxoTotal DESC LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function corredorMaiorFluxo(idEmpresa) {
    console.log("ACESSANDO O KPI CORREDOR POPULAR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT C.setor, C.idCorredor, sum(fluxoDePessoas) as fluxoTotal, C.fkEmpresa
        FROM dadosSensor as D JOIN sensor as S
        ON D.fkSensor = S.idSensor JOIN corredor as C
        ON S.fkCorredor = C.idCorredor
        WHERE fkEmpresa = ${idEmpresa}
        GROUP BY C.setor, C.fkEmpresa, C.idCorredor
        ORDER BY fluxoTotal DESC LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    totalPessoasKpi,
    setorPopular,
    corredorMaiorFluxo
};
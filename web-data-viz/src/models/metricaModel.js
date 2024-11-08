var database = require("../database/config")

function listar(idEmpresa) {
    console.log("ACESSEI O METRICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT * FROM metricas
        WHERE fkEmpresa = '${idEmpresa}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(idEmpresa, alto, medio, baixo) {
    console.log("ACESSEI O METRICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", idEmpresa, alto, medio, baixo);
    
    var instrucaoSql = `
        INSERT INTO metricas (fkEmpresa, alto, medio, baixo) VALUES ('${idEmpresa}' ,'${alto}', '${medio}', '${baixo}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizar(idEmpresa, idMetrica, alto, medio, baixo) {
    console.log("ACESSEI O METRICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", idEmpresa, idMetrica, alto, medio, baixo);
    
    var instrucaoSql = `
        UPDATE metricas SET alto = '${alto}', medio = '${medio}', baixo = '${baixo}' WHERE fkEmpresa = '${idEmpresa}' AND idMetrica = '${idMetrica}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    cadastrar,
    atualizar
};
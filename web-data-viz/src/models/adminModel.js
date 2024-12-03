var database = require("../database/config");

function listarKpi() {
    // console.log("ACESSEI O KPI ADMIN MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
    SELECT
        (SELECT 
        COUNT(DISTINCT idSensor) 
            FROM sensor
        WHERE estadoSensor = 'Ativado') as qtdSensor,
        (SELECT
        COUNT(DISTINCT idEmpresa) 
            FROM empresa) AS qtdClientes;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarConosco() {
    // console.log("ACESSEI O Conosco ADMIN MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT
            (SELECT 
                COUNT(idContato)
            FROM contato
            WHERE respondido = true) AS qtdRespondido,
            (SELECT 
                COUNT(idContato)
            FROM contato
            WHERE respondido = false) AS qtdEspera,
            idContato,
            nome,
            email,
            socioOuCeo,
            empresa,
            mensagem,
            respondido,
            DATE_FORMAT(dtContato, '%d/%m/%Y') AS dtContato
        FROM contato
        ORDER BY dtContato DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// SELECT
// (SELECT 
//     COUNT(idContato)
// FROM contato
//     WHERE respondido = true) AS qtdRespondido,
// (SELECT 
//     COUNT(idContato)
// FROM contato
//     WHERE respondido = false) AS qtdEspera;

module.exports = {
    listarKpi,
    listarConosco
};
var database = require("../database/config")

function listar(idEmpresa) {
    console.log("ACESSEI O METRICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT idFormulario,
        qtdCorredoresComSensor,
        DATE_FORMAT(dtImplementacao, '%d/%m/%y') AS dtImplementacaoFormatada,
        logradouro,
        numero,
        complemento,
        cep,
        bairro,
        cidade,
        estado
        FROM formulario
        WHERE fkEmpresa = '${idEmpresa}'
        ORDER BY dtImplementacao DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(idEmpresa, qtdCorredor, dtImplementacao, logradouro, numero, complemento, cep, bairro, cidade, estado) {
    console.log("ACESSEI O METRICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", idEmpresa, qtdCorredor, dtImplementacao, logradouro, numero, complemento, cep, bairro, cidade, estado);
    
    var instrucaoSql = `
        INSERT INTO formulario (fkEmpresa, qtdCorredoresComSensor, dtImplementacao, logradouro, numero, complemento, cep, bairro, cidade, estado) VALUES ('${idEmpresa}' ,'${qtdCorredor}', '${dtImplementacao}', '${logradouro}', '${numero}', '${complemento}', '${cep}', '${bairro}', '${cidade}', '${estado}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    cadastrar
};
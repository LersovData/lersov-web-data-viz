var database = require("../database/config");

function listarDadosSetor(){
    var instrucao = `
        SELECT c.setor,
        SUM(d.fluxoDePessoas) AS totalFluxo,
        HOUR(d.dtHora) AS dtHora
        FROM dadosSensor AS d
            JOIN sensor AS s 
                ON d.fkSensor = s.idSensor
            JOIN corredor AS c
                ON s.fkCorredor = c.idCorredor
            GROUP BY 
            c.setor,
            HOUR(d.dtHora)
            ORDER BY HOUR(d.dtHora) DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarDadosCorredor(){
    var instrucao = `
        SELECT D.idDados, C.setor, D.fluxoDePessoas AS totalFluxo, TIME(dtHora) as dtHora
        FROM dadosSensor AS D
        JOIN sensor AS S ON D.fkSensor = S.idSensor
        JOIN corredor AS C ON S.fkCorredor = C.idCorredor
        GROUP BY D.idDados, C.setor, dtHora, fluxoDePessoas ORDER BY idDados DESC LIMIT 7;


    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// function listarDadosCalor(){
//     var instrucao = `
//         SELECT D.idDados, C.setor, D.fluxoDePessoas AS totalFluxo, TIME(dtHora) as dtHora
//         FROM dadosSensor AS D
//         JOIN sensor AS S ON D.fkSensor = S.idSensor
//         JOIN corredor AS C ON S.fkCorredor = C.idCorredor
//         GROUP BY D.idDados, C.setor, dtHora, fluxoDePessoas ORDER BY idDados DESC LIMIT 7;


//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

module.exports = {
    listarDadosSetor,
    listarDadosCorredor,
    // listarDadosCalor
};
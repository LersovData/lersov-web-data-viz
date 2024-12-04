function cadastrarContato() {
    var emailVar = input_email.value;
    var nomeVar = input_nome.value;
    var empresaVar = input_empresa.value;
    var cargoVar = select_cargo.value;
    var mensagemVar = input_mensagem.value;

    if (emailVar == '' || nomeVar == '' || empresaVar == '' || cargoVar == '' || mensagemVar == '') {
        return false;
    } else {
        fetch(`/admin/cadastrarConosco/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emailServer: emailVar,
                nomeServer: nomeVar,
                empresaServer: empresaVar,
                cargoServer: cargoVar,
                mensagemServer: mensagemVar
            }),
        })
            .then(function (resposta) {
                // console.log("resposta: ", resposta);

                if (resposta.ok) {
                    // console.log("Métrica realizado com sucesso! Redirecionando para tela atualizada...");
                    input_email.value = '';
                    input_nome.value = '';
                    input_empresa.value = '';
                    select_cargo.value = '';
                    input_mensagem.value = '';
                } else {
                    throw "Houve um erro ao tentar realizar o salvamento do contato!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });

        return false;
    }
}
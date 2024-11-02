// inputs
var mediaPessoas = 0;

//hortifruti
var qtdPessoasHorti = 0;
var precoMedioHorti = 0;
var qtdVendaHorti = 0;

//massas
var qtdPessoasMassas = 0;
var precoMedioMassas = 0;
var qtdVendaMassas = 0;

//massas
var qtdPessoasLimp = 0;
var precoMedioLimp = 0;
var qtdVendaLimp = 0;

function insertDados() {
    mediaPessoas = Number(input_media.value);
    if (mediaPessoas <= 0) {
        botaoMedia.style.background = "grey";
    } else {
        botaoMedia.style.background = "blue";
    }

    qtdPessoasHorti = Number(input_qtdPessCorredorHorti.value);
    precoMedioHorti = Number(input_precoMedioHortiCorredor.value);
    qtdVendaHorti = Number(input_vendaCorredorHorti.value);

    qtdPessoasMassas = Number(input_qtdPessCorredorMassas.value);
    precoMedioMassas = Number(input_precoMedioMassasCorredor.value);
    qtdVendaMassas = Number(input_vendaCorredorMassas.value);

    qtdPessoasLimp = Number(input_qtdPessCorredorLimp.value);
    precoMedioLimp = Number(input_precoMedioLimpCorredor.value);
    qtdVendaLimp = Number(input_vendaCorredorLimp.value);

    if (qtdPessoasHorti > 0 && qtdPessoasLimp > 0 && qtdPessoasMassas > 0) {
        botaoResultado.style.background = "blue";
    } else {
        botaoResultado.style.background = "grey";
    }
}

function mediaDiaria() {
    div_inicio.style.display = "none";
    div_totalPessoas.style.display = "block";

    div_corredores.style.display = "none";
    div_corredorHortifruti.style.display = "none";
    div_corredorMassas.style.display = "none";
    div_corredorLimpeza.style.display = "none";

    div_resultado.style.display = "none";

    botaoMedia.style.background = "grey";
}

function corredores() {
    if (mediaPessoas > 0) {
        div_totalPessoas.style.display = "none";
        div_corredores.style.display = "block";
    }

    div_corredorHortifruti.style.display = "none";
    div_corredorMassas.style.display = "none";
    div_corredorLimpeza.style.display = "none";
}

function setor() {
    div_corredores.style.display = "none";
    div_corredorHortifruti.style.display = "block";
}

function setor1() {
    div_corredores.style.display = "none";
    div_corredorMassas.style.display = "block";
}

function setor2() {
    div_corredores.style.display = "none";
    div_corredorLimpeza.style.display = "block";
}

function resultado() {
    if (qtdPessoasHorti > 0 && qtdPessoasLimp > 0 && qtdPessoasMassas > 0) {
        div_corredores.style.display = "none";
        div_resultado.style.display = "block";
    }

    var lucroHorti = precoMedioHorti * qtdVendaHorti;
    var taxaConversaoHorti = (qtdVendaHorti / qtdPessoasHorti) * 100;
    var fluxoHorti = (qtdPessoasHorti / mediaPessoas) * 100;

    var lucroMassas = precoMedioMassas * qtdVendaMassas;
    var taxaConversaoMassas = (qtdVendaMassas / qtdPessoasMassas) * 100;
    var fluxoMassas = (qtdPessoasMassas / mediaPessoas) * 100;

    var lucroLimp = precoMedioLimp * qtdVendaLimp;
    var taxaConversaoLimp = (qtdVendaLimp / qtdPessoasLimp) * 100;
    var fluxoLimp = (qtdPessoasLimp / mediaPessoas) * 100;

    var sugestaoHorti = ``;
    var sugestaoMassas = ``;
    var sugestaoLimp = ``;

    var tpConvHorti = ``;
    var tpConvMassas = ``;
    var tpConvLimp = ``;

    var convBaixa = `(<span style="color: red;">baixa</span>)`;
    var convRazo = `(<span style="color: orange;">razoável</span>)`;
    var convAlta = `(<span style="color: yellowgreen;">alta</span>)`;
    var convExtAlta = `(<span style="color: green;">extremamente alta</span>)`;

    // definição da taxa de conversão para Hortifruti
    if (taxaConversaoHorti < 25) {
        tpConvHorti = convBaixa;
    } else if (taxaConversaoHorti < 50) {
        tpConvHorti = convRazo;
    } else if (taxaConversaoHorti < 75) {
        tpConvHorti = convAlta;
    } else {
        tpConvHorti = convExtAlta;
    }

    // definição da taxa de conversão para Massas
    if (taxaConversaoMassas < 25) {
        tpConvMassas = convBaixa;
    } else if (taxaConversaoMassas < 50) {
        tpConvMassas = convRazo;
    } else if (taxaConversaoMassas < 75) {
        tpConvMassas = convAlta;
    } else {
        tpConvMassas = convExtAlta;
    }

    // definição da taxa de conversão para Limpeza
    if (taxaConversaoLimp < 25) {
        tpConvLimp = convBaixa;
    } else if (taxaConversaoLimp < 50) {
        tpConvLimp = convRazo;
    } else if (taxaConversaoLimp < 75) {
        tpConvLimp = convAlta;
    } else {
        tpConvLimp = convExtAlta;
    }

    if (fluxoHorti > 50 && fluxoMassas > 50 && fluxoLimp > 50) {
        // sugestão especificas para cada setor
        if (taxaConversaoHorti < 40) {
            sugestaoHorti = `O fluxo de pessoas está acima da média no corredor de hortifruti, mas a conversão está baixa. Trabalhe para melhorar a taxa de conversão com promoções ou melhores displays de produtos.`;
        } else {
            sugestaoHorti = `O fluxo de pessoas está bom no corredor de hortifruti. Continue assim!`;
        }

        if (taxaConversaoMassas < 40) {
            sugestaoMassas = `O fluxo de pessoas está acima da média no corredor de massas, mas a conversão está baixa. Trabalhe para melhorar a taxa de conversão com promoções ou melhores displays de produtos.`;
        } else {
            sugestaoMassas = `O fluxo de pessoas está bom no corredor de massas. Continue assim!`;
        }

        if (taxaConversaoLimp < 40) {
            sugestaoLimp = `O fluxo de pessoas está acima da média no corredor de limpeza, mas a conversão está baixa. Trabalhe para melhorar a taxa de conversão com promoções ou melhores displays de produtos.`;
        } else {
            sugestaoLimp = `O fluxo de pessoas está bom no corredor de limpeza. Continue assim!`;
        }
    } else {
        // sugestões para o corredor de massas
        if (taxaConversaoMassas > taxaConversaoLimp && taxaConversaoMassas > taxaConversaoHorti && (qtdPessoasMassas > qtdPessoasHorti || qtdPessoasMassas > qtdPessoasLimp)) {
            sugestaoMassas = `Seu corredor de massas está muito bem!`;
        } else if (taxaConversaoMassas < 50 && fluxoMassas > mediaPessoas) {
            sugestaoMassas = `O fluxo de pessoas no corredor de massas está acima da média, mas a conversão está baixa. Tente melhorar a disposição dos produtos ou realizar promoções.`;
        } else if (taxaConversaoMassas < 50 && qtdPessoasMassas < qtdPessoasHorti) {
            sugestaoMassas = `Mover seus produtos de massas para o corredor de hortifruti pode potencializar suas vendas!`;
        } else if (taxaConversaoMassas < 50 && qtdPessoasMassas < qtdPessoasLimp) {
            sugestaoMassas = `Mudar seus produtos de massas para o corredor de limpeza deve potencializar suas vendas!`;
        } else {
            sugestaoMassas = `Seu corredor de massas precisa de mais fluxo e conversão. Avalie campanhas promocionais.`;
        }

        // sugestões para o corredor de hortifruti
        if (taxaConversaoHorti > taxaConversaoLimp && taxaConversaoHorti > taxaConversaoMassas && (qtdPessoasHorti > qtdPessoasLimp || qtdPessoasHorti > qtdPessoasMassas)) {
            sugestaoHorti = `Seu corredor de hortifruti está muito bem!`;
        } else if (fluxoHorti > mediaPessoas && taxaConversaoHorti < 50) {
            sugestaoHorti = `O fluxo de pessoas no corredor de hortifruti está acima da média, mas a conversão está baixa. Tente melhorar a exposição dos produtos.`;
        } else if (taxaConversaoHorti < 50 && qtdPessoasHorti < qtdPessoasMassas) {
            sugestaoHorti = `Mover seus produtos de hortifruti para o corredor de massas pode potencializar suas vendas!`;
        } else if (taxaConversaoHorti < 50 && qtdPessoasHorti < qtdPessoasLimp) {
            sugestaoHorti = `Mover seus produtos de hortifruti para o corredor de limpeza pode potencializar suas vendas!`;
        } else {
            sugestaoHorti = `Seu corredor de hortifruti precisa de mais fluxo e conversão. Avalie campanhas de marketing.`;
        }

        // sugestões para o corredor de limpeza
        if (taxaConversaoLimp > taxaConversaoHorti && taxaConversaoLimp > taxaConversaoMassas && (qtdPessoasLimp > qtdPessoasHorti || qtdPessoasLimp > qtdPessoasMassas)) {
            sugestaoLimp = `Seu corredor de limpeza está muito bem!`;
        } else if (fluxoLimp > mediaPessoas && taxaConversaoLimp < 50) {
            sugestaoLimp = `O fluxo de pessoas no corredor de limpeza está acima da média, mas a conversão está baixa. Tente melhorar a disposição dos produtos.`;
        } else if (taxaConversaoLimp < 50 && qtdPessoasLimp < qtdPessoasMassas) {
            sugestaoLimp = `Mover seus produtos de limpeza para o corredor de massas pode potencializar suas vendas!`;
        } else if (taxaConversaoLimp < 50 && qtdPessoasLimp < qtdPessoasHorti) {
            sugestaoLimp = `Mover seus produtos de limpeza para o corredor de hortifruti pode potencializar suas vendas!`;
        } else {
            sugestaoLimp = `Seu corredor de limpeza precisa de mais fluxo e conversão. Avalie estratégias de marketing.`;
        }
    }

    textFluxoHorti.innerHTML = `${qtdPessoasHorti} (${fluxoHorti.toFixed(1)}% do dia)`;
    textLucroHorti.innerHTML = `R$ ${lucroHorti}`;
    textProdHorti.innerHTML = `${qtdVendaHorti}`;
    textConvHorti.innerHTML = `${taxaConversaoHorti.toFixed(1)}%`;
    textTpConvHorti.innerHTML = `${tpConvHorti}`;

    textFluxoMassas.innerHTML = `${qtdPessoasMassas} (${fluxoMassas.toFixed(1)}% do dia)`;
    textLucroMassas.innerHTML = `R$ ${lucroMassas}`;
    textProdMassas.innerHTML = `${qtdVendaMassas}`;
    textConvMassas.innerHTML = `${taxaConversaoMassas.toFixed(1)}%`;
    textTpConvMassas.innerHTML = `${tpConvMassas}`;

    textFluxoLimp.innerHTML = `${qtdPessoasLimp} (${fluxoLimp.toFixed(1)}% do dia)`;
    textLucroLimp.innerHTML = `R$ ${lucroLimp}`;
    textProdLimp.innerHTML = `${qtdVendaLimp}`;
    textConvLimp.innerHTML = `${taxaConversaoLimp.toFixed(1)}%`;
    textTpConvLimp.innerHTML = `${tpConvLimp}`;

    textSugHorti.innerHTML = `${sugestaoHorti}`;
    textSugMassas.innerHTML = `${sugestaoMassas}`;
    textSugLimp.innerHTML = `${sugestaoLimp}`;
}


function relatorio() {
    div_relatorio.style.display = "block";

    div_lucroHorti.style.display = `block`;
    div_prodHorti.style.display = `block`;
    div_lucroMassas.style.display = `block`;
    div_prodMassas.style.display = `block`;
    div_lucroLimp.style.display = `block`;
    div_prodLimp.style.display = `block`;

    div_sugestaoHorti.style.display = "none";
    div_sugestaoLimp.style.display = "none"
    div_sugestaoMassas.style.display = "none"
}

function sugestao() {
    div_lucroHorti.style.display = `none`;
    div_prodHorti.style.display = `none`;
    div_lucroMassas.style.display = `none`;
    div_prodMassas.style.display = `none`;
    div_lucroLimp.style.display = `none`;
    div_prodLimp.style.display = `none`;

    div_sugestaoHorti.style.display = "block";
    div_sugestaoLimp.style.display = "block"
    div_sugestaoMassas.style.display = "block"
}

function novamente() {
    div_resultado.style.display = "none";
    div_inicio.style.display = "block";

    input_media.value = ``;
    input_qtdPessCorredorHorti.value = ``;
    input_precoMedioHortiCorredor.value = ``;
    input_vendaCorredorHorti.value = ``;

    input_qtdPessCorredorMassas.value = ``;
    input_precoMedioMassasCorredor.value = ``;
    input_vendaCorredorMassas.value = ``;

    input_qtdPessCorredorLimp.value = ``;
    input_precoMedioLimpCorredor.value = ``;
    input_vendaCorredorLimp.value = ``;
}
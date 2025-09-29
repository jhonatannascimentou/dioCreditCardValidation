
// Função para validar o número do cartão usando o algoritmo de Luhn
function isValidLuhn(cardNumber) {
    let sum = 0;
    let shouldDouble = false;
    // Percorre os dígitos da direita para a esquerda
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i), 10);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
}

// Função para identificar a bandeira do cartão de crédito usando apenas expressões regulares e validação Luhn
function getCardBrand(cardNumber) {
    cardNumber = String(cardNumber).replace(/\D/g, ''); // Remove caracteres não numéricos

    if (!isValidLuhn(cardNumber)) {
        return 'Número de cartão inválido (Luhn)';
    }

    const bandeiras = [
        { nome: 'Elo', regex: /^(4011|4312|4389)/ },
        { nome: 'Visa', regex: /^4/ },
        { nome: 'MasterCard', regex: /^(5[1-5])|^(222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)/ },
        { nome: 'American Express', regex: /^(34|37)/ },
        { nome: 'Discover', regex: /^(6011|65|64[4-9])/ },
        { nome: 'Hipercard', regex: /^6062/ },
    ];

    const encontrada = bandeiras.find(b => b.regex.test(cardNumber));
    return encontrada ? encontrada.nome : 'Bandeira desconhecida';
}


// Leitura do número do cartão via console
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Digite o número do cartão: ', (input) => {
    console.log(`A bandeira do cartão é: ${getCardBrand(input)}`);
    rl.close();
});

// Exporte a função para uso externo, se necessário
module.exports = { getCardBrand };

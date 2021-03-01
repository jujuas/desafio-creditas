const assert = require('assert').strict;
//adicionado constantes para cada tipo de emprestimo
const personal = ["personal", 0.04];
const equity = ["home equity", 0.03];
const payroll = ["payroll", 0.02];

//funcao para adicionar os impostos conforme regra de negocio do desafio
function addTaxes(taxes, income, age, location) {

    if (income <= 3000) {
        taxes.push(personal);
        if (age <= 30) taxes.push(equity);
    }
    else if (income > 3000 && income < 5000) {
        taxes.push(personal);
        if (location == "SP") taxes.push(equity);
    }
    else {
        taxes.push(personal, payroll);
        if (location == "SP" && age <= 30) taxes.push(equity);
    }  
}

//montar o objeto loan conforme os parametros informados
function addLoan(loans, type, taxes, amountRequested) {

    const loan = {
        type: type,
        taxes: taxes,
        interest: amountRequested * taxes,
        totalAmount: amountRequested + (amountRequested * taxes)
    }
    loans.push(loan);
}

//ultima validacao para incluir o loan. Verifica se o emprestimo solicitado encaixa nas regras e monta o objeto loan.
function addVerifiedLoans(loans, amountRequested, taxes) {

    for (var i = 0; i < taxes.length; i++) {
        if (taxes[i][0] == "personal" && amountRequested <= 20000) addLoan(loans, taxes[i][0], taxes[i][1], amountRequested);
        else if (taxes[i][0] == "home equity" && amountRequested <= 100000) addLoan(loans, taxes[i][0], taxes[i][1], amountRequested);
        else if (taxes[i][0] == "payroll" && amountRequested <= 40000) addLoan(loans, taxes[i][0], taxes[i][1], amountRequested);
    }
}



const getCustomerLoans = (customersInfo) => {
    // Desenvolva aqui sua função getCustomerLoans
    const customers = [];
    for (var i = 0; i < customersInfo.customers.length; i++) {

        var name = customersInfo.customers[i].name;
        var age = customersInfo.customers[i].age;
        var location = customersInfo.customers[i].location;
        var income = customersInfo.customers[i].income;
        var amountRequested = customersInfo.customers[i].amountRequested;

        var taxes = [];
        addTaxes(taxes, income, age, location);
        var loans = [];
        addVerifiedLoans(loans, amountRequested, taxes);

        const custom = { customer: name, amountRequested: amountRequested, loans: loans };
        customers.push(custom);
    }

    return customers;
}

/**

Abaixo estão definidos alguns testes simples para avaliar se a sua função está funcionando como esperado.

Você pode utilizá-los para entender melhor como deve ser o retorno da função para os diferentes tipos de clientes.

Inicialmente todos irão falhar, mas quando sua função for implementada corretamente eles deixarão de acusar erros.

**/

assert(getCustomerLoans({
    "customers": [{
        "name": "Dekker",
        "cpf": "111.111.111-11",
        "age": 18,
        "location": "SC",
        "income": 2000,
        "amountRequested": 10000
    }]
}
)[0].loans.some(e => e.type == "personal" && e.taxes == 0.04 && e.interest === 400 && e.totalAmount === 10400), "returns personal loan when customer income is under 3000")
//teste com erro (corrigido)
assert(getCustomerLoans({
    "customers": [{
        "name": "Mity",
        "cpf": "222.222.222-22",
        "age": 20,
        "location": "SP",
        "income": 8000,
        "amountRequested": 20000
    }]
}
)[0].loans.some(e => e.type == "payroll" && e.taxes == 0.02 && e.interest === 400 && e.totalAmount === 20400), "returns payroll loan when customer is under 30 and their income is above 5000")
//teste com erro (corrigido)
assert(getCustomerLoans(
    {
        "customers": [{
            "name": "Will",
            "cpf": "333.333.333-33",
            "age": 24,
            "location": "SP",
            "income": 6000,
            "amountRequested": 40000
        }]
    }
)[0].loans.some(e => e.type == "home equity" && e.taxes == 0.03 && e.interest === 1200 && e.totalAmount === 41200), "returns home equity loan when customer income is above 5000")

assert.deepEqual(getCustomerLoans(
    {
        "customers": [{
            "name": "Dereo",
            "cpf": "444.444.444-44",
            "age": 26,
            "location": "SP",
            "income": 8000,
            "amountRequested": 10000
        }]
    }
)[0].loans.map(e => e.type).sort(), ["home equity", "payroll", "personal"], "returns all loans when customer is under 30, from SP and their income is above 5000")

assert(getCustomerLoans(
    {
        "customers": [{
            "name": "Bruno",
            "cpf": "555.555.555-55",
            "age": 28,
            "location": "SP",
            "income": 10000,
            "amountRequested": 200000
        }]
    }
)[0].loans.length === 0, "returns no loans when customer asking price is above 100000")

console.log("Sucesso! Nenhum erro foi apontado pelos testes.")

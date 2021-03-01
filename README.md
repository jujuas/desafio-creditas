# Desafio de Código

A proposta da aplicação é disponibilizar as modalidades de empréstimo que uma pessoa tem acesso de acordo com algumas variáveis.

Devemos prover os seguintes modelos de empréstimo:
- Empréstimo pessoal (`personal`) com taxa de juros (`taxes`) igual a 4%
- Empréstimo com garantia de imóvel (`home equity`) com taxa de juros igual a 3%
- Consignado (`payroll`) com taxa de juros igual a 2% 

Além disso, a aplicação deve retornar o valor de juros (`interest`) e total do empréstimo (`totalAmount`) para cada modalidade para a qual a pessoa é elegível.

Para o cálculo dessas variáveis, considere as seguintes fórmulas:

`interest = amountRequested * taxes`

`totalAmount = amountRequested + interest`
<br/>

Abaixo seguem as regras de negócio relacionadas a concessão de empréstimo de acordo com o salário da pessoa:

|                          | Empréstimo pessoal | Empréstimo c/ garantia | Consignado |
| ------------------------ | ------------------ | :--------------------: | ---------- |
| Salario <= 3000          | Sim                |       Sim\*\*\*        | Não        |
| Salario > 3000 e < 5000 | Sim                |        Sim\*\*         | Não        |
| Salário => 5000          | Sim                |         Sim\*          | Sim        |
<br/>

- \* Clientes com menos de 30 anos
- \*\* Clientes que residem em SP
- \*\*\* Clientes com menos de 30 anos que residem em SP

E abaixo seguem as regras de negócio relacionadas a concessão de empréstimo de acordo com o valor solicitado (`amountRequested`):

|                          | Empréstimo pessoal | Empréstimo c/ garantia | Consignado |
| ------------------------ | ------------------ | :--------------------: | ---------- |
| Valor solicitado <= 20000          | Sim                |       Sim       | Sim        |
| Valor solicitado <= 40000 | Não                |        Sim        | Sim        |
| Valor solicitado <= 100000         | Não                |         Sim          | Não        |
| Valor solicitado > 100000         | Não                |         Não          | Não        |
<br/>

### Utilização da aplicação:

A função `getCustomerLoans` deve receber como entrada essas informações:

##### input

```json
{
  "customers": [
    {
    "name": "Rachel",
    "cpf": "123.456.789-10",
    "age": 31,
    "location": "MG",
    "income": 3000,
    "amountRequested": 20000
    },
    {
    "name": "Phoebe",
    "cpf": "234.567.891-01",
    "age": 32,
    "location": "RJ",
    "income": 6000,
    "amountRequested": 20000
    }
  ]
}
```

_Para fins de simplicidade, considere que vamos sempre receber os dados corretos (tipos e formatos)_

E deve responder essas informações:

##### output

```json
[
  {
  "customer": "Rachel",
  "amountRequested": 20000,
  "loans": [
    {
      "type": "personal",
      "taxes": 0.04,
      "interest": 800,
      "totalAmount": 20800
    }
    ]
  },
  {
  "customer": "Phoebe",
  "amountRequested": 20000,
  "loans": [
    {
      "type": "personal",
      "taxes": 0.04,
      "interest": 800,
      "totalAmount": 20800
    },
    {
      "type": "payroll",
      "taxes": 0.03,
      "interest": 600,
      "totalAmount": 20600
    },
    ]
  }
]
```
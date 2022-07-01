let greeting = `Welcome to Currency Converter!`;

let usd = {currency: `USD`, rate: 1.0};
let jpy = {currency: `JPY`, rate: 113.5};
let eur = {currency: `EUR`, rate: 0.89};
let rub = {currency: `RUB`, rate: 74.36};
let gbp = {currency: `GBP`, rate: 0.75};

const currencies = [usd, jpy, eur, rub, gbp];

const showCurrency = (currencies) => {
    let table = ``;
    for (let i = 0; i < currencies.length; i++) {
        if (i === 0) {
            table += `1 USD equals  ${currencies[i].rate} ${currencies[i].currency}`;
        } else {
            table += `\n1 USD equals  ${currencies[i].rate} ${currencies[i].currency}`;
        }
    }
    return table;
};

console.log(greeting);
console.log(showCurrency(currencies));

//Second Chapter
const input = require('sync-input');

let msgCanDo = `I can convert USD to these currencies: JPY, EUR, RUB, USD, GBP`;

console.log(msgCanDo);

let errorMsgCurrency = `Unknown currency`;
let errorMsgAmountLess = `The amount cannot be less than 1`;
let errorMsgAmountNumb = `The amount has to be a number`;
let actualRate = 0;
let actualCurrency = false;
let actualAmount = 0;
let result = false;

let currencyInput = input(`Type the currency you wish to convert: USD
To: `);

let controllCurrencyInput = () => {
    let temp = currencyInput.toUpperCase().trim();

    let found = () => {
        for (const item of currencies) {
            if (item.currency === temp) {
                actualCurrency = item.currency;
                actualRate = item.rate;
                found = true;
                controllCurrencyInput = true;
                break;
            } else {
                found = false;
                controllCurrencyInput = false;
            }
        }
    }

    found();

    if (!found) {
        console.log(errorMsgCurrency);
    }
}

controllCurrencyInput();

if (controllCurrencyInput) {
    let amountInput = Number(input(`Amount: `));

    const controllAmountInput = () => {
        if (amountInput >= 1) {
            actualAmount = amountInput;
        } else if (isNaN(amountInput)) {
            result = errorMsgAmountNumb;
        } else {
            result = errorMsgAmountLess;
        }
    }

    controllAmountInput();

    if (!result) {
        let sum = actualAmount * actualRate;
        console.log(`${actualAmount} USD equals ${sum.toFixed(4)} ${actualCurrency}`);
    } else {
        console.log(result);
    }

}

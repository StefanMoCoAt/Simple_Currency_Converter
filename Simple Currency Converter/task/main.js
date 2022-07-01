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

const input = require('sync-input');

let msgCanDo = `What do you want to convert?`;

console.log(msgCanDo);

let errorMsgCurrency = `Unknown currency`;
let errorMsgAmountLess = `The amount can not be less than 1`;
let errorMsgAmountNumb = `The amount has to be a number`;
let actualRateFrom = 0;
let actualRateTo = 0;
let actualCurrencyFrom = false;
let actualCurrencyTo = false;
let actualAmount = 0;
let result = false;

//From ...
let currencyInputFrom = input(`From: `);

let controllCurrencyInputFrom = () => {
    let temp = currencyInputFrom.toUpperCase().trim();

    let found = () => {
        for (const item of currencies) {
            if (item.currency === temp) {
                actualCurrencyFrom = item.currency;
                actualRateFrom = item.rate;
                found = true;
                controllCurrencyInputFrom = true;
                break;
            } else {
                found = false;
                controllCurrencyInputFrom = false;
            }
        }
    }

    found();

    if (!found) {
        console.log(errorMsgCurrency);
    }
}

controllCurrencyInputFrom();

if (controllCurrencyInputFrom && !result) {

    // To: ...
    let currencyInputTo = input(`To: `);

    let controllCurrencyInputTo = () => {
        let temp = currencyInputTo.toUpperCase().trim();

        let found = () => {
            for (const item of currencies) {
                if (item.currency === temp) {
                    actualCurrencyTo = item.currency;
                    actualRateTo = item.rate;
                    found = true;
                    controllCurrencyInputTo = true;
                    break;
                } else {
                    found = false;
                    controllCurrencyInputTo = false;
                }
            }
        }

        found();

        if (!found) {
            console.log(errorMsgCurrency);
        }
    }

    controllCurrencyInputTo();

    if (controllCurrencyInputTo) {

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
            let amountToUSD = actualAmount / actualRateFrom;
            let sum = amountToUSD * actualRateTo
            console.log(`Result: ${actualAmount} ${actualCurrencyFrom} equals ${sum.toFixed(4)} ${actualCurrencyTo}`);
        } else {
            console.log(result);
        }
    }
}
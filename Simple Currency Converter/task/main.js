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

let converter = () => {

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
    let currencyInputFrom = input(`What do you want to convert?
From: `);

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
            converter();
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
                converter();
            }
        }

        controllCurrencyInputTo();

        if (controllCurrencyInputTo) {

            let amountInput = Number(input(`Amount: `));

            if (amountInput >= 1) {
                actualAmount = amountInput;
            } else if (isNaN(amountInput)) {
                result = errorMsgAmountNumb;
                console.log(errorMsgAmountNumb);
                converter();
            } else {
                result = errorMsgAmountLess;
                console.log(errorMsgAmountLess);
                converter();
            }

            if (!result) {
                let amountToUSD = actualAmount / actualRateFrom;
                let sum = amountToUSD * actualRateTo
                console.log(`Result: ${actualAmount} ${actualCurrencyFrom} equals ${sum.toFixed(4)} ${actualCurrencyTo}`);
            } else {
                console.log(result);
            }
        }
    }
}

let exit = false;

let msgCanDo = `What do you want to do?
1-Convert currencies 2-Exit program`;

do {

    console.log(msgCanDo);

    let menu = Number(input());

    switch (menu) {
        case 1:
            converter();
            break;
        case 2:
            console.log(`Have a nice day!`);
            exit = true;
            break;
        default:
            console.log(`Unknown input`)
            break;
    }
} while (!exit);


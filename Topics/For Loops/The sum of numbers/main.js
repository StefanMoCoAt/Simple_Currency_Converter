const calc = () => {
    let result = 0;
    for (let i = 1; i < 101; i++) {
        result += i;
    }
    return result;
};

console.log(calc());
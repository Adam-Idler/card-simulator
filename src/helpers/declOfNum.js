export function declOfNum(num, text_forms) {
    const number = Math.abs(num) % 100; 
    const lastDigitOfNumber = number % 10;
    
    if (number > 10 && number < 20) return `${num} ${text_forms[2]}`; 
    if (lastDigitOfNumber > 1 && lastDigitOfNumber < 5) return `${num} ${text_forms[1]}`; 
    else if (lastDigitOfNumber == 1) return `${num} ${text_forms[0]}`;

    return `${num} ${text_forms[2]}`;
};
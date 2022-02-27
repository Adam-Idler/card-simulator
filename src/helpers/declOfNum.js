export function declOfNum(number, text_forms) {  
    number = Math.abs(number) % 100; 
    const lastDigitOfNumber = number % 10;
    
    if (number > 10 && number < 20) return `${number} ${text_forms[2]}`; 
    if (lastDigitOfNumber > 1 && lastDigitOfNumber < 5) return `${number} ${text_forms[1]}`; 
    else if (lastDigitOfNumber == 1) return `${number} ${text_forms[0]}`;

    return `${number} ${text_forms[2]}`;
};
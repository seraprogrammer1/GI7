text_display = document.getElementById('display-text');
allButtons = document.querySelectorAll("button");

const Calculator = {
    // Calculator problem solve functions
    answer: (equation) => {return eval(equation)},
    // Calculator operator check functions
    anyOperator: (char) => {return char == '/' | char == '*' | char == '-' | char == '+';},
    // Calculator reformat functions
    reformat: (oldFormat) => {oldFormat = oldFormat.replace(/%/g, '/100');return oldFormat;},
    // Calculator setup
    setup: () => {
        
        let anyOperator = Calculator.anyOperator;
        let reformat = Calculator.reformat;
        let answer = Calculator.answer;    

        // gets all the buttons
        for (let i = 0; i < allButtons.length; i++) {
            const button = allButtons[i];
            const value = button.innerHTML;

            // Gives all button functionality
            button.addEventListener('click', () => {

                //last character in the calculator
                const before = text_display.value.charAt(text_display.value.length-1);

                // every button execept specail functionality buttons listed below
                if (value != "C" && value != "=" && value != "(" && value != 'x' && value != "⇤"){

                    // makes sure that the last input is a ) and the new input is not and operator or %
                    if (before && before == ')' && !anyOperator(value) &&  value !== "%"){
                        text_display.value += '*' + value;
                    } 
                    else 
                    {
                        text_display.value += value;
                    }
                }
                // multiply button
                if (value == "x") {
                    text_display.value += '*'
                }
                // clear button
                if (value == "C") {
                    text_display.value = '';
                }
                // equal button
                if (value == "="){
                    // catches invalid syntax
                    try {
                        text_display.value = answer(reformat(text_display.value))
                    } catch {
                        alert('Invalid syntax');
                    }
                }
                // starting parenthesis button
                if (value == "("){
                    if (before && !anyOperator(before)){
                        text_display.value += '*(';
                    }
                    else {
                        text_display.value += '(';
                    }
                }
                // delete button
                if (value == "⇤"){
                    text_display.value = text_display.value.slice(0, -1);
                }
            })
        }
    }
};

let reformat = Calculator.reformat;
let answer = Calculator.answer;  

// Validator only allows: [[  0-9, *, /, (, ), %, ., -, +  ]] to be entered
text_display.onkeypress = (event) => {
    return event.charCode >= 47 && event.charCode <= 57 || event.charCode === 46 
    || event.charCode >= 40 && event.charCode <= 45 && event.charCode !== 44 || event.charCode === 37;
}   

// solve when Enter is pressed
text_display.addEventListener('keydown',(event) => {
    if (event.key == 'Enter'){
        // catches invalid syntax
        try {
            text_display.value = answer(reformat(text_display.value))
        } catch {
            alert('Invalid syntax');
        }
    }
})

Calculator.setup();
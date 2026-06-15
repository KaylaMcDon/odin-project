function operate(num1, num2, operation) {
    if (operation == "+") {
        return num1 + num2;
    }
    else if (operation == "-") {
        return num1 - num2;
    }
    else if (operation == "*") {
        return num1 * num2;
    }
    else if (operation == "/") {
        return num1 / num2;
    }
}

let firstNum = "";
let secondNum = "";
let operator = "";
let previousAnswer = "";

const display = document.getElementById("display");

function updateDisplay() {
    display.textContent = firstNum + operator + secondNum;
}

function clearData() {
    firstNum = "";
    secondNum = "";
    operator = "";
    previousAnswer = "";
    decimalButton.disabled = false;
}

function updateEquationNumber(digit) {
    if (operator === "") {
        firstNum += digit;
    } else {
        secondNum += digit;
    }
    updateDisplay();
}

function updateEquationOperation(operation) {
    //Checks if the first number has been selected
    //if it hasn't then checks to see whether the previous answer can be used instead,
    //or if an error needs to be thrown
    if (firstNum == "") {
        if (previousAnswer == "") {
            clearData()
            display.textContent = "Error! Please select a number first"
        } else if (previousAnswer != "") {

            firstNum = previousAnswer;
            operator = operation;
            updateDisplay();
        }
    } else {
        //checks to see if theres already a valid equation,
        //and solves that equation first before starting the next one
        if (operator != "" && secondNum != "") {
            solveEquation();
            firstNum = previousAnswer;
        }

        operator = operation;
        updateDisplay();
    }
    decimalButton.disabled = false;
}

function solveEquation() {
    if (operator == "/" && secondNum == "0") {
        //check for divide by 0 error
        clearData();
        display.textContent = "Error! Cannot divide by 0";
    } else if (operator == "" || secondNum == "") {
        //check to ensure both numbers and an operation have been selected
        clearData();
        display.textContent = "Error! Please write a full equation";
    } else {
        //saves the previous answer in a variable for the next calculation if needed
        previousAnswer = operate(parseFloat(firstNum), parseFloat(secondNum), operator).toString();
        while(previousAnswer[previousAnswer.length-1]=="0"){
            previousAnswer=previousAnswer.slice(0, previousAnswer.length-1) //removes trailing 0s
        }
        display.textContent = previousAnswer;

        //Removes old inputs to allows the user to immediantly start typing another equation if preffered
        //clearData() is not used since it would also reset previousAnswer
        firstNum = "";
        secondNum = "";
        operator = "";
        decimalButton.disabled = false;
    }
}

//adds an event listener to all 10 buttons
for (let i = 0; i < 10; i++) {
    const button = document.getElementById(i.toString());
    button.addEventListener("click", () => {
        updateEquationNumber(i);
    })
}

//logic for main 4 operations
const additionButton = document.getElementById("add");
additionButton.addEventListener("click", () => {
    updateEquationOperation("+");
})
const subtractionButton = document.getElementById("sub");
subtractionButton.addEventListener("click", () => {
    updateEquationOperation("-");
})
const multiplicationButton = document.getElementById("mult");
multiplicationButton.addEventListener("click", () => {
    updateEquationOperation("*");
})
const divisionButton = document.getElementById("div");
divisionButton.addEventListener("click", () => {
    updateEquationOperation("/");
})

//logic for other buttons
const decimalButton = document.getElementById("decimal");
decimalButton.addEventListener("click", () => {
    decimalButton.disabled = true;
    updateEquationNumber(".")
})
const equalsButton = document.getElementById("equals");
equalsButton.addEventListener("click", () => {
    solveEquation();
})
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
    clearData();
    display.textContent = "0";
})
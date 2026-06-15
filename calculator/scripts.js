function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(num1, num2, operation) {
    //todo: make sure num1 and num2 exist
    if (operation == "+") {
        return add(num1, num2);
    }
    else if (operation == "-") {
        return subtract(num1, num2);
    }
    else if (operation == "*") {
        return multiply(num1, num2);
    }
    else if (operation == "/") {
        return divide(num1, num2);
    }
}



let firstNum = "";
let secondNum = "";
let operator = "";

const display = document.getElementById("display");

function updateEquationNumber(digit) {
    if (operator === "") {
        firstNum += digit;
    } else {
        secondNum += digit;
    }
    display.textContent = firstNum + operator + secondNum;
}

function clearData() {
    firstNum = "";
    secondNum = "";
    operator = "";
}

function updateEquationOperation(operation) {
    if (firstNum == "" && isNaN(display.textContent[0])) {
        clearData()
        display.textContent = "Please select a number first!"
    } else if(firstNum == "" && !isNaN(display.textContent[0])){
        //checks whether the display has a number that isnt stored in firstNum that should be used
        firstNum = display.textContent;
        operator = operation;
        display.textContent = firstNum + operator + secondNum;
    } else {
        if (operator != "" && secondNum != "") {
            solveEquation();
            firstNum=display.textContent;
        }

        operator = operation;
        display.textContent = firstNum + operator + secondNum;
    }
}

function solveEquation() {
    if (operator == "/" && secondNum == "0") {
        clearData();
        display.textContent = "Error! Cannot divide by 0";
    } else if (operator == "" || secondNum=="") {
        clearData();
        display.textContent = "Please write a full equation";
    } else {
        firstNum = operate(parseInt(firstNum), parseInt(secondNum), operator).toString();
        if(firstNum.length > 10) {firstNum=firstNum.slice(0, 10);}
        display.textContent = firstNum;
        clearData()
        //this updates the display, and then clears the stored numbers.
        //This means that if someone inputs a new equation the old result is automatically deleted,
        //But that if they select an operator the resut from the previous answer is used due to the logic of updateEquationOperation
    }
}

//adds an event listener to all 10 buttons
for (let i = 0; i < 10; i++) {
    const btn = document.getElementById(i.toString());
    btn.addEventListener("click", () => {
        updateEquationNumber(i);
    })
}

//logic for main 4 operations
const btnAdd = document.getElementById("add");
btnAdd.addEventListener("click", () => {
    updateEquationOperation("+");
})
const btnSub = document.getElementById("sub");
btnSub.addEventListener("click", () => {
    updateEquationOperation("-");
})
const btnMult = document.getElementById("mult");
btnMult.addEventListener("click", () => {
    updateEquationOperation("*");
})
const btnDiv = document.getElementById("div");
btnDiv.addEventListener("click", () => {
    updateEquationOperation("/");
})

//equals button
const btnEquals = document.getElementById("equals");
btnEquals.addEventListener("click", () => {
    solveEquation();
})

//clear button
const btnClear = document.getElementById("clear");
btnClear.addEventListener("click", () => {
    clearData();
    display.textContent = "0";
})
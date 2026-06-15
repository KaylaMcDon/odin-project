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
    if (operation == "add") {
        return add(num1, num2);
    }
    else if (operation == "sub") {
        return subtract(num1, num2);
    }
    else if (operation == "mult") {
        return multiply(num1, num2);
    }
    else if (operation == "div") {
        return divide(num1, num2);
    }
    else {
        alert("Please insert a valid equation");
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

function updateEquationOperation(operation) {
    operator = operation;
    display.textContent = firstNum + operator + secondNum;
}

//adds an event listener to all 10 buttons
for (let i = 0; i < 10; i++) {
    const btn = document.getElementById(i.toString());
    btn.addEventListener("click", () => {
        updateEquationNumber(i);
    })
}

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
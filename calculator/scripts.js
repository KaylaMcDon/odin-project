function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(num1, num2, operation){
    //todo: make sure num1 and num2 exist
    if(operation=="add"){
        return add(num1, num2);
    }
    else if(operation=="sub"){
        return subtract(num1, num2);
    }
    else if(operation=="mult"){
        return multiply(num1, num2);
    }
    else if(operation=="div"){
        return divide(num1, num2);
    }
    else {
        alert("Please insert a valid equation");
    }
}
const displayInput = document.querySelector(".display .input");
const displayOutput = document.querySelector(".display .output");

let isResultDisplayed = false;

function appendToDisplay(value) {
    if (isResultDisplayed) {
        clearDisplay();
        isResultDisplayed = false; 
    }
    displayInput.textContent += value;
}

function clearDisplay() {
    displayInput.textContent = '';
    displayOutput.textContent = '';
}

function deleteLastCharacter() {
    displayInput.textContent = displayInput.textContent.slice(0, -1);
}

function calculate() {
    try {
        let expression = displayInput.textContent.replace(/x/g, '*');
        
        let result = eval(expression);
        
        if (Number.isInteger(result)) {
            displayOutput.textContent = result;
        } else {
            result = Math.round(result * 100) / 100;
            displayOutput.textContent = result;
        }
        
        isResultDisplayed = true;
    } catch (error) {
        displayOutput.textContent = "Error";
    }
}

const numButtons = document.querySelectorAll(".num");
numButtons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-key");
        appendToDisplay(value);
    });
});

const numOperators = document.querySelectorAll(".operator");
numOperators.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-key");
        appendToDisplay(value);
    });
});

const decimalKey = document.querySelectorAll(".decimal");
decimalKey.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-key");
        appendToDisplay(value);
    });
});

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearDisplay);

const backButton = document.querySelector(".backspace");
backButton.addEventListener("click", deleteLastCharacter);

const equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", calculate);

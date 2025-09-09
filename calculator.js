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

function appendOperator(op) {
    if (isResultDisplayed) {
        isResultDisplayed = false;
    }

    if (displayInput.textContent === "" && (op === "x" || op === "/")) return;

    const lastChar = displayInput.textContent.slice(-1);
    if ("+-x/%".includes(lastChar)) {
        displayInput.textContent = displayInput.textContent.slice(0, -1) + op;
    } else {
        appendToDisplay(op);
    }
}

function appendDecimal() {
    const parts = displayInput.textContent.split(/[\+\-\*x/%]/);
    const lastNumber = parts[parts.length - 1];
    if (!lastNumber.includes(".")) {
        appendToDisplay(".");
    }
}

function calculate() {
    try {
        if (displayInput.textContent.trim() === "") return;

        let expression = displayInput.textContent.replace(/x/g, '*');
        let result = eval(expression);

        if (!isFinite(result)) {
            displayOutput.textContent = "Error";
            return;
        }

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

document.querySelectorAll(".num").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-key");
        appendToDisplay(value);
    });
});

document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-key");
        appendOperator(value);
    });
});

document.querySelectorAll(".decimal").forEach(button => {
    button.addEventListener("click", appendDecimal);
});

document.querySelector(".clear").addEventListener("click", clearDisplay);
document.querySelector(".backspace").addEventListener("click", deleteLastCharacter);
document.querySelector(".equal").addEventListener("click", calculate);

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key)) {
        appendToDisplay(key);
    }

    if (key === ".") {
        appendDecimal();
    }

    if (["+", "-", "*", "/", "%"].includes(key)) {
        appendOperator(key === "*" ? "x" : key);
    }

    if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    }

    if (key === "Backspace") {
        deleteLastCharacter();
    }

    if (key === "Escape") {
        clearDisplay();
    }
});

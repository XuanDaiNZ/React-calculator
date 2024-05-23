import { useState } from "react";
import "./App.css";

function App() {
  const [currentOperand, setCurrentOperand] = useState(""); // State to store the current operand input
  const [operation, setOperation] = useState(null); // State to store the selected operation
  const [overwrite, setOverwrite] = useState(false); // State to determine whether to overwrite the current operand

  // Function to append a number or decimal point to the current operand
  const appendNumber = (number) => {
    if (overwrite) {
      setCurrentOperand(number); // Overwrite the current operand with the new number
      setOverwrite(false); // Reset overwrite state
    } else {
      if (number === "." && currentOperand.includes(".")) return; // Prevent multiple decimals
      if (number === "0" && currentOperand === "0") return; // Prevent multiple leading zeros
      setCurrentOperand(currentOperand + number); // Append the number to the current operand
    }
  };

  // Function to choose an operation (addition, subtraction, multiplication, division)
  const chooseOperation = (operation) => {
    if (currentOperand === "") return; // Do nothing if current operand is empty
    if (overwrite) {
      setCurrentOperand(currentOperand + operation); // Append operation to the current operand if overwriting
      setOverwrite(false); // Reset overwrite state
    } else {
      setCurrentOperand(currentOperand + operation); // Append operation to the current operand
    }
    setOperation(operation); // Set the selected operation
  };

  // Function to calculate the result of the expression
  const calculate = (expression) => {
    try {
      // Split the expression into tokens (numbers and operators)
      const tokens = expression.split(/([+\-*/÷])/);
      let result = parseFloat(tokens[0]); // Parse the first number

      // Loop through the tokens and perform the operations
      for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i]; // Get the operator
        const nextNumber = parseFloat(tokens[i + 1]); // Get the next number

        if (isNaN(nextNumber)) return "Error"; // Return "Error" if the next number is not a valid number

        // Perform the operation based on the operator
        switch (operator) {
          case "+":
            result += nextNumber;
            break;
          case "-":
            result -= nextNumber;
            break;
          case "*":
            result *= nextNumber;
            break;
          case "÷":
            result /= nextNumber;
            break;
          default:
            return "Error"; // Return "Error" if the operator is not valid
        }
      }

      return result.toString(); // Return the result as a string
    } catch (e) {
      return "Error"; // Return "Error" if there is an exception
    }
  };

  // Function to clear the current operand and reset the calculator
  const clear = () => {
    setCurrentOperand(""); // Clear the current operand
    setOperation(null); // Reset the selected operation
    setOverwrite(false); // Reset overwrite state
  };

  // Function to delete the last character from the current operand
  const deleteLast = () => {
    if (overwrite) {
      setCurrentOperand("0"); // Reset current operand to "0" if overwriting
      setOverwrite(false); // Reset overwrite state
    } else {
      setCurrentOperand(currentOperand.slice(0, -1)); // Remove the last character from the current operand
    }
  };

  // Function to compute the result of the expression
  const compute = () => {
    let value = calculate(currentOperand); // Calculate the result from the current operand
    setCurrentOperand(value); // Set the current operand to the result
    setOperation(null); // Reset the selected operation
    setOverwrite(true); // Set overwrite state to true for the next input
  };

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="current-operand">{currentOperand}</div> {/* Display the current operand */}
      </div>
      {/*Add Buttons*/}
      <button className="span-two" onClick={clear}>AC </button>
      <button onClick={deleteLast}>DEL</button> 
      <button onClick={() => chooseOperation("÷")}>&divide;</button> 
      <button onClick={() => appendNumber("1")}>1</button> 
      <button onClick={() => appendNumber("2")}>2</button> 
      <button onClick={() => appendNumber("3")}>3</button> 
      <button onClick={() => chooseOperation("*")}>*</button> 
      <button onClick={() => appendNumber("4")}>4</button> 
      <button onClick={() => appendNumber("5")}>5</button> 
      <button onClick={() => appendNumber("6")}>6</button> 
      <button onClick={() => chooseOperation("+")}>+</button> 
      <button onClick={() => appendNumber("7")}>7</button> 
      <button onClick={() => appendNumber("8")}>8</button> 
      <button onClick={() => appendNumber("9")}>9</button> 
      <button onClick={() => chooseOperation("-")}>-</button> 
      <button onClick={() => appendNumber(".")}>.</button> 
      <button onClick={() => appendNumber("0")}>0</button> 
      <button className="span-two" onClick={compute}>=</button>
    </div>
  );
}

export default App;

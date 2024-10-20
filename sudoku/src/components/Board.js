import React, { useState, useEffect } from 'react';
import './Board.css';

// Generate a complete Sudoku board
const generateCompleteSudoku = () => {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));

  const isValid = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }
    return true;
  };

  const fillBoard = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const nums = [...Array(9).keys()].map(i => i + 1);
          for (let num of nums.sort(() => Math.random() - 0.5)) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (fillBoard(board)) return true;
              board[row][col] = 0; // Backtrack
            }
          }
          return false;
        }
      }
    }
    return true; // All cells filled
  };

  fillBoard(board);
  return board;
};

// Function to create the Sudoku puzzle by removing numbers
const createPuzzle = (board) => {
  const puzzle = board.map(row => [...row]);
  let count = 0;

  while (count < 40) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0; // Remove number
      count++;
    }
  }
  return puzzle;
};

const Board = () => {
  const [board, setBoard] = useState([]);
  const [completeBoard, setCompleteBoard] = useState([]);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState(Array.from({ length: 9 }, () => Array(9).fill('')));

  useEffect(() => {
    const initialCompleteBoard = generateCompleteSudoku();
    const initialPuzzle = createPuzzle(initialCompleteBoard);
    setBoard(initialPuzzle);
    setCompleteBoard(initialCompleteBoard);
  }, []);

  const handleChange = (rowIndex, colIndex, value) => {
    if (value === '' || /^[1-9]$/.test(value)) {
      const newBoard = [...board];
      newBoard[rowIndex][colIndex] = value ? parseInt(value, 10) : 0; // Set to 0 if empty
      setBoard(newBoard);
      setMessage(''); // Reset message on valid input
      setColor((prev) => {
        const newColor = [...prev];
        newColor[rowIndex][colIndex] = ''; // Reset color on valid input
        return newColor;
      });
    } else {
      setMessage('Invalid input! Please enter a number between 1 and 9.'); // Error message
    }
  };

  const checkValue = (rowIndex, colIndex) => {
    const inputValue = board[rowIndex][colIndex];
    const correctValue = completeBoard[rowIndex][colIndex];

    if (inputValue === 0) {
      setMessage('Please enter a number!'); // Alert if empty
      setColor((prev) => {
        const newColor = [...prev];
        newColor[rowIndex][colIndex] = 'transparent'; // Reset color
        return newColor;
      });
    } else if (inputValue !== correctValue) {
      setMessage('Incorrect solution! Try again.'); // Alert if incorrect
      setColor((prev) => {
        const newColor = [...prev];
        newColor[rowIndex][colIndex] = '#ff4500'; // Change to red for incorrect
        return newColor;
      });
      document.getElementById(`cell-${rowIndex}-${colIndex}`).value = ''; // Clear invalid input
    } else {
      setMessage('Correct!'); // Alert if correct
      setColor((prev) => {
        const newColor = [...prev];
        newColor[rowIndex][colIndex] ='#7cfc00' ; // Change to green for correct
        return newColor;
      });
    }
  };

  return (
    <div>
      <div className="sudoku-board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              id={`cell-${rowIndex}-${colIndex}`}
              key={`${rowIndex}-${colIndex}`}
              type="text"
              maxLength="1"
              className={`sudoku-cell ${cell === 0 ? '' : 'pre-filled'}`}
              style={{ backgroundColor: color[rowIndex][colIndex] }} // Change background color based on evaluation
              value={cell === 0 ? '' : cell}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              onBlur={() => checkValue(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
      <div className="message-container"> {/* Container for messages */}
        <p className="message">{message}</p> {/* Display messages below the board */}
      </div>
    </div>
  );
};

export default Board;

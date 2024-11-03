import React, { useState, useEffect } from 'react';
import './Board.css';

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
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };
  fillBoard(board);
  return board;
};

const createPuzzle = (board) => {
  const puzzle = board.map(row => [...row]);
  let count = 0;
  while (count < 40) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      count++;
    }
  }
  return puzzle;
};

const Board = () => {
  const [board, setBoard] = useState([]);
  const [completeBoard, setCompleteBoard] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [initialValues, setInitialValues] = useState([]);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const initialCompleteBoard = generateCompleteSudoku();
    const initialPuzzle = createPuzzle(initialCompleteBoard);
    setBoard(initialPuzzle);
    setCompleteBoard(initialCompleteBoard);
    setInitialValues(initialPuzzle.map(row => row.map(cell => cell !== 0)));
    setSelectedCell(null);
    setMessage('');
    setGameOver(false);
  };

  const handleCellClick = (row, col) => {
    if (!initialValues[row][col]) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberInput = (num) => {
    if (selectedCell && !gameOver) {
      const { row, col } = selectedCell;
      const newBoard = board.map(row => [...row]);
      newBoard[row][col] = num;

      if (num === completeBoard[row][col]) {
        setMessage('');
        setBoard(newBoard);
        const isGameComplete = newBoard.every((r, rIndex) =>
          r.every((cell, cIndex) => cell === completeBoard[rIndex][cIndex])
        );
        if (isGameComplete) {
          setMessage("Congratulations, you've completed the game!");
          setGameOver(true);
        }
      } else {
        setMessage('Incorrect number. Try again.');
        setBoard(newBoard);
      }
    }
  };

  const handleRestart = () => {
    const clearedBoard = board.map((row, rowIndex) =>
      row.map((cell, colIndex) => (initialValues[rowIndex][colIndex] ? cell : 0))
    );
    setBoard(clearedBoard);
    setMessage('');
    setSelectedCell(null);
    setGameOver(false);
  };

  const handlePlayAgain = () => {
    resetGame();
  };

  return (
    <div className="sudoku-container">
      <h2>Sudoku Game</h2>
      <div className="sudoku-grid">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => {
              const isInitial = initialValues[rowIndex][colIndex];
              const isSelected = selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex;
              const isCorrect = cell === completeBoard[rowIndex][colIndex] && !isInitial;
              const isIncorrect = cell !== completeBoard[rowIndex][colIndex] && !isInitial && cell !== 0;

              return (
                <div
                  key={colIndex}
                  className={`sudoku-cell ${isInitial ? 'initial' : ''} ${
                    isSelected ? 'selected' : ''
                  } ${isCorrect ? 'correct' : ''} ${isIncorrect ? 'incorrect' : ''}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell !== 0 ? cell : ''}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="button-container">
        <div className="number-buttons">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button key={num} onClick={() => handleNumberInput(num)} className="number-button">
              {num}
            </button>
          ))}
        </div>
        <button className="control-button" onClick={handleRestart}>Restart</button>
        {gameOver && (
          <button
            className="control-button play-again"
            onClick={handlePlayAgain}
          >
            Play Again
          </button>
        )}
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Board;

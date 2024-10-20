const express = require('express');
const router = express.Router();
const sudoku = require('sudoku');

// Route to return a random Sudoku puzzle
router.get('/random', (req, res) => {
  const puzzle = sudoku.makepuzzle();
  const formattedPuzzle = puzzle.map(value => (value === null ? '' : value + 1)); // Convert nulls to empty strings

  let twoDArray = [];
  while (formattedPuzzle.length) {
    twoDArray.push(formattedPuzzle.splice(0, 9));  // Create a 9x9 matrix
  }

  res.json({ puzzle: twoDArray });
});

// Route to check the Sudoku solution
router.post('/check', (req, res) => {
  const { sudoku } = req.body;
  
  // Simplified validation logic for example
  // You can validate the user's solution with a solver or compare it to a known solution.
  
  // For now, return success
  res.json({ message: 'Solution checked!' });
});

module.exports = router;

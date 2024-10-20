// Header.js
import React from 'react'
function Header()
{
  return (
    <header>
      <h1>Welcome to Sudoku</h1>
      <p>
        Sudoku is a logic-based number-placement puzzle. The objective is to fill a 9×9 grid with digits so that
        each column, each row, and each of the nine 3×3 subgrids that compose the grid (also called "boxes",
        "blocks", or "regions") contain all of the digits from 1 to 9.
      </p>
      <h2>Rules:</h2>
      <ul>
        <li >Each number must appear exactly once in each row.</li>
        <li >Each number must appear exactly once in each column.</li>
        <li >Each number must appear exactly once in each 3×3 subgrid.</li>
      </ul>
    </header>
  );
};

export default Header;

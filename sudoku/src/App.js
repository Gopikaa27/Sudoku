// App.js
import React from 'react';
import Header from './Header';
import Board from './components/Board'; // Assuming your Sudoku component is named Sudoku
import Footer from './Footer';

const App = () => {
  // Inline styles for centering
  const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',  // Center align items horizontally
    justifyContent: 'center', // Center align items vertically
    minHeight: '100vh', // Full viewport height
    backgroundColor: '#f0f0f0', // Background color for the app
    padding: '20px',
  };

  return (
    <div style={appStyle}>
      <Header />
      <Board />
      <Footer />
    </div>
  );
};

export default App;

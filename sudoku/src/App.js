import React from 'react';
import Header from './Header';
import Board from './components/Board'; // Assuming your Sudoku component is named Board
import Footer from './Footer';

const App = () => {
  const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: '30px',
    minHeight: '100vh', // Full height
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

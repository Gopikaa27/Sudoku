// Footer.js
import React from 'react';

const Footer = () => {
  // Inline styles
  const footerStyle = {
    textAlign: 'center',
    marginTop: '20px',
    padding: '10px 0',
    backgroundColor: '#f4f4f4',
    borderTop: '1px solid #ccc',
  };

  const footerTextStyle = {
    fontSize: '1em',
    color: '#333',
  };

  return (
    <footer style={footerStyle}>
      <p style={footerTextStyle}>All rights reserved by Gopika.</p>
    </footer>
  );
};

export default Footer;

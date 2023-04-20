// FloatingWindow.js
import React from 'react';
import './floatingWindow.css';

const FloatingWindow = ({ children, onClose }) => {
    return (
        <>
            <div className="overlay" onClick={onClose}></div>
            <div className="floating-window">
            <button className="close-button" onClick={onClose}>&times;</button>
            {children}
            </div>
        </>
    );
  };
  
  export default FloatingWindow;

// FloatingWindow.js
import React from 'react';
import './bodyContainer.css';

const BodyContainer = ({ children }) => {
    return (
        <div className='body-container'>
            {children}
        </div>
    );
  };
  
  export default BodyContainer;

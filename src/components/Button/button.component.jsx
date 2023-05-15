import React from 'react';
import './button.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Button = ({text, onClick, isDisable, icon=faPlus}) => {
  return (
    <div className='button-container'>
      <button className="custom-button" onClick={onClick} disabled={isDisable}>
        <FontAwesomeIcon icon={icon} />
        <span className='text'>{text?? 'Button'}</span>
    </button>
    </div>
  );
};

export default Button;
import React from 'react';
import './button.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Button = ({text, onClick}) => {
  return (
    <div className='button-container'>
      <button className="custom-button" onClick={onClick}>
        <FontAwesomeIcon icon={faPlus} />
        <span className='text'>{text?? 'Button'}</span>
    </button>
    </div>
  );
};

export default Button;
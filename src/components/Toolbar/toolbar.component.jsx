import React from 'react';
import './toolbar.css';

const Toolbar = ({children}) => {
  return (
    <div className='toolbar-body'>
      {children}
    </div>
  );
};

export default Toolbar;
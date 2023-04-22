import React from 'react';
import './header.css';

const Header = () => {
  const title = 'Inventario'
  return (
    <div className='header'>
      {/* Contenido del header */}
      <h2 className='title'>{title}</h2>
    </div>
  );
};

export default Header;
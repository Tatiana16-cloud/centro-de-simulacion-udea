import React from 'react';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const title = 'Inventario'
  const user = {
    name: "Pepito Perez"
  }

  return (
    <div className='header'>
      {/* Contenido del header */}
      <h2 className='title'>{title}</h2>
      <div className='user-info'>
        <FontAwesomeIcon icon={faUser} style={{ fontSize: "20px"}}/>
        <h2 className='text-name'>{user.name}</h2>
      </div>
    </div>
  );
};

export default Header;
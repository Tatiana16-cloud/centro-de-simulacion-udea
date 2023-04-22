import React from 'react';
import './sidebar.css';
import MenuDropDown from '../MenuDropDown/menuDropDown.component'
import { faCoffee, faUser, faCog, faHome, faStar, faCircle, faSquare } from '@fortawesome/free-solid-svg-icons';


const menuItems = [
  {
    label: 'Mi cuenta',
    submenu: [
      { label: 'Submenú 1.1', icon: faStar },
      { label: 'Submenú 1.2', icon: faCircle },
      { label: 'Submenú 1.3', icon: faSquare },
    ],
    icon: faHome,
  },
  {
    label: 'Inventario',
    submenu: [
      { label: 'Submenú 2.1', icon: faStar },
    ],
    icon: faUser,
  },
  {
    label: 'Otra opción',
    submenu: [
      { label: 'Submenú 3.1', icon: faStar },
      { label: 'Submenú 3.2', icon: faCircle },
    ],
    icon: faCog,
  },
  {
    label: 'Otra más',
    submenu: [
      { label: 'Submenú 4.1', icon: faStar },
    ],
    icon: faCoffee,
  },
]

const Sidebar = () => {
  return (
    <div className='sidebar'>
      {/* Contenido del sidebar */}
      <h3 className='title-text'>UNIVERSIDAD DE ANTIOQUÍA</h3>
      <p className='subtitle-text'>Sistema de inventario</p>
      <p className='general-text'>Laboratorio de simulación y gestión del riesgo</p>
      <MenuDropDown menuItems={menuItems}/>
    </div>
  );
};

export default Sidebar;
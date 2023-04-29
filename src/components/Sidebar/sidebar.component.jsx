import React from 'react';
import './sidebar.css';
import MenuDropDown from '../MenuDropDown/menuDropDown.component'
import { faClipboard, faUser, faPlusSquare, faScrewdriverWrench, faSignOut, faBars, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import {ACTIONS} from '../../Commons/actions.commons'

const Sidebar = ({onMenuItemClick, selectedOption = ACTIONS.viewDevices}) => {
  
  const menuItems = [
    {
      label: 'Mi cuenta',
      submenu: [
        { action: ACTIONS.viewProfile, label: 'Perfil', icon: faAddressCard },
        { action: ACTIONS.closeSession, label: 'Cerrar Sesión', icon: faSignOut },
      ],
      icon: faUser,
    },
    {
      label: 'Inventario',
      submenu: [
        { action: ACTIONS.viewDevices, label: 'Ver equipos', icon: faClipboard },
        { action: ACTIONS.newDevice, label: 'Ingresar equipo', icon: faPlusSquare },
        { action: ACTIONS.viewSupports, label: 'Mantenimientos', icon: faScrewdriverWrench },
      ],
      icon: faBars,
    }
  ]
  
  const onItemClick = (itemIndex, subItemIndex) => {
    onMenuItemClick(menuItems[itemIndex].submenu[subItemIndex].action)
  }

  const getInitialMenuState = ()=>{
    const menuItem = menuItems.find((item)=> {
      return item.submenu.find((subItem)=> subItem.action === selectedOption)
    })
    
    return {
      initialMenuIndex: menuItems.findIndex(item => item.label === menuItem.label),
      initialSubmenuIndex: menuItems.find(item => item.label === menuItem.label).submenu.findIndex(subItem => subItem.action === selectedOption)
    }
  }

  return (
    <div className='sidebar'>
      {/* Contenido del sidebar */}
      <h3 className='title-text'>UNIVERSIDAD DE ANTIOQUÍA</h3>
      <p className='subtitle-text'>Sistema de inventario</p>
      <p className='general-text'>Laboratorio de simulación y gestión del riesgo</p>
      <MenuDropDown 
        menuItems={menuItems} 
        onItemClick={onItemClick}
        initialActiveIndex={getInitialMenuState().initialMenuIndex}
        initialSelectedSubItemIndex={getInitialMenuState().initialSubmenuIndex}
      />
    </div>
  );
};

export default Sidebar;
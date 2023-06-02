import React from 'react';
import './sidebar.css';
import MenuDropDown from '../MenuDropDown/menuDropDown.component'
import { 
  faClipboard, 
  faUser, 
  faPlusSquare, 
  faScrewdriverWrench, 
  faSignOut, 
  faBars, 
  faAddressCard,
  faCalendarDays,
  faUsers,
  faFlaskVial,
  faLocationCrosshairs
} from '@fortawesome/free-solid-svg-icons';
import {ACTIONS} from '../../Commons/actions.commons'

const Sidebar = ({onMenuItemClick, selectedOption = ACTIONS.viewDevices}) => {
  
  const menuItems = [
    {
      label: 'Mi cuenta',
      submenu: [
        { action: ACTIONS.closeSession, label: 'Cerrar Sesión', icon: faSignOut },
      ],
      icon: faUser,
    },
    // {
    //   label: 'Inventario',
    //   submenu: [
    //     { action: ACTIONS.viewDevices, label: 'Ver equipos', icon: faClipboard },
    //     { action: ACTIONS.newDevice, label: 'Ingresar equipo', icon: faPlusSquare },
    //     { action: ACTIONS.viewSupports, label: 'Mantenimientos', icon: faScrewdriverWrench },
    //   ],
    //   icon: faBars,
    // },
    {
      label: 'Mis reservas',
      submenu: [
        // { action: ACTIONS.manageUsers, label: 'Gestionar usuarios', icon: faUsers },
        // { action: ACTIONS.managePlaces, label: 'Gestionar espacios', icon: faLocationCrosshairs },
        // { action: ACTIONS.manageLabs, label: 'Gestionar practicas', icon: faFlaskVial },
        { action: ACTIONS.manageReservations, label: 'Gestionar reservas', icon: faCalendarDays },
      ],
      icon: faBars,
    }
  ]


  // const [user, setUser] = useState(null)

  // useEffect(()=>{
  //   const userLocalString = localStorage.getItem('user');
  //   const userLocal = JSON.parse(userLocalString)
  //   if(userLocal?.name) setUser(userLocal)
  //   if(!userLocal?.name) navigate('/')
  // }, [])
  // if(user.rol == "Admin")
  // {
  //   menuItems = menuItemsAdmin
  // }
  // else{
  //   menuItems = menuItemsUser
  // }
  
  const onItemClick = (itemIndex, subItemIndex) => {
    onMenuItemClick(menuItems[itemIndex].submenu[subItemIndex].action)
  }

  const getInitialMenuState = ()=>{
    const menuItem = menuItems.find((item)=> {
      return item.submenu.find((subItem)=> subItem.action === selectedOption)
    })
    
    return {
      initialMenuIndex: menuItems.findIndex(item => item.label === menuItem?.label),
      initialSubmenuIndex: menuItems.find(item => item.label === menuItem?.label)?.submenu.findIndex(subItem => subItem.action === selectedOption)
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
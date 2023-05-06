import React, {useEffect, useState} from 'react';
import Sidebar from '../../components/Sidebar/sidebar.component';
import Header from '../../components/Header/header.component';
import DevicesBody from '../../components/DevicesBody/devicesBody.component';
import styles from './Home.module.css';
import BodyContainer from '../../components/Body/bodyContainer.component';
import { ACTIONS } from '../../Commons/actions.commons';
import DeviceInfo from '../../components/DeviceInfo/DeviceInfo.component';
import { useSelector, useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logInSuccess } from "../../redux/actions";
import ManageUsersBody from '../../components/ManageUsersBody/manageUsersBody.component';
import ManagePlacesBody from '../../components/ManagePlacesBody/managePlacesBody.component';
import ManageLabsBody from '../../components/ManageLabsBody/manageLabsBody.component';
import ManageReservationsBody from '../../components/ManageReservationsBody/manageReservationsBody.component';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeItem, setActiveItem] = useState(ACTIONS.viewDevices);
  const [deviceToView, setDeviceToView] = useState({})
  const [deviceToEdit, setDeviceToEdit] = useState({})
  const [user, setUser] = useState(null)

  const viewableDevice = useSelector(state=>state.viewableDevice)
  const editableDevice = useSelector(state=>state.editableDevice)

  useEffect(()=>{
    const userLocalString = localStorage.getItem('user');
    const userLocal = JSON.parse(userLocalString)
    if(userLocal?.name) setUser(userLocal)
    if(!userLocal?.name) navigate('/')
  }, [])

  const modifyObjectToDeviceInfoFormat = (device, isEditable) => {
    return Object.keys(device).reduce((result, key)=>{
      if(device[key] && typeof device[key] === 'object'){
        result[key] = modifyObjectToDeviceInfoFormat(device[key],isEditable)
      }else{
        result[key] = {
          value: device[key],
          isEditable: isEditable,
        }
      }
      return result;
    },{})
  }

  useEffect(()=>{
    if(!editableDevice) return;
    const deviceToEdit = modifyObjectToDeviceInfoFormat(editableDevice, true)
    setDeviceToEdit(deviceToEdit)
  },[editableDevice])

  useEffect(()=>{
    if(!viewableDevice) return;
    const deviceToView = modifyObjectToDeviceInfoFormat(viewableDevice, false)
    setDeviceToView(deviceToView)
  },[viewableDevice])

  const onMenuItemClickEvent = (action) => {
    setActiveItem(action)
    if(action === ACTIONS.closeSession) {
      dispatch(logInSuccess({ user: null }))
      localStorage.setItem('user', null);
      navigate('/')
    }
  }

  const onToolbarClickEvent = (action) => {
    setActiveItem(action)
  }

  return (
    <div className={styles["main-view"]}>
      
      <Sidebar onMenuItemClick={onMenuItemClickEvent} selectedOption={activeItem}/>
      {user && (
              <div className={styles["content"]}>
              <Header user={user} title={
                activeItem === ACTIONS.viewDevices? 'Inventario' :
                activeItem === ACTIONS.viewDevice? 'Hoja de vida' :
                activeItem === ACTIONS.editDevice? 'Editar equipo' :
                activeItem === ACTIONS.newDevice? 'Nuevo equipo' :
                activeItem === ACTIONS.viewProfile ? 'Perfil' :
                activeItem === ACTIONS.viewSupports ? 'Mantenimientos' :
                activeItem === ACTIONS.manageUsers ? 'Usuarios' :
                activeItem === ACTIONS.managePlaces ? 'Espacios' :
                activeItem === ACTIONS.manageLabs ? 'Prácticas' :
                activeItem === ACTIONS.manageReservations ? 'Reservas' :
                'Desconocido'
              }/>
              <BodyContainer>
                { activeItem === ACTIONS.manageUsers && <ManageUsersBody someProp={0}/>}
                { activeItem === ACTIONS.managePlaces && <ManagePlacesBody someProp={0}/>}
                { activeItem === ACTIONS.manageLabs && <ManageLabsBody someProp={0}/>}
                { activeItem === ACTIONS.manageReservations && <ManageReservationsBody someProp={0}/>}
      
                { activeItem === ACTIONS.viewDevices && <DevicesBody onActionEvent={onToolbarClickEvent}/>}
                { [ACTIONS.newDevice, ACTIONS.editDevice, ACTIONS.viewDevice].includes(activeItem)  && 
                  <DeviceInfo deviceInput={
                    activeItem === ACTIONS.viewDevice? deviceToView :
                    activeItem === ACTIONS.editDevice? deviceToEdit :
                    activeItem === ACTIONS.newDevice? {} : {}
                  }/>
                }
              </BodyContainer>
            </div>
      )}
    </div>
  );
};

export default Home;
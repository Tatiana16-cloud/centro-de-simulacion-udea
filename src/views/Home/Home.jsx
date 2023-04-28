import React, {useState} from 'react';
import Sidebar from '../../components/Sidebar/sidebar.component';
import Header from '../../components/Header/header.component';
import DevicesBody from '../../components/DevicesBody/devicesBody.component';
import styles from './Home.module.css';
import BodyContainer from '../../components/Body/bodyContainer.component';
import { ACTIONS } from '../../Commons/actions.commons';

const Home = () => {
  const [activeItem, setActiveItem] = useState(ACTIONS.viewDevices);

  const onMenuItemClickEvent = (action) => {
    console.log("HOME","onMenuItemClickEvent",action)
    setActiveItem(action)
  }

  const onToolbarClickEvent = (action) => {
    console.log("HOME","onToolbarEvent",action)
    setActiveItem(action)
  }

  return (
    <div className={styles["main-view"]}>
      <Sidebar onMenuItemClick={onMenuItemClickEvent} selectedOption={activeItem}/>
      <div className={styles["content"]}>
        <Header />
        <BodyContainer>
          { activeItem === ACTIONS.viewDevices && <DevicesBody onActionEvent={onToolbarClickEvent}/>}
        </BodyContainer>
      </div>
    </div>
  );
};

export default Home;
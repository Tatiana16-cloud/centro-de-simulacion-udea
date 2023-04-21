import React from 'react';
import Sidebar from '../../components/Sidebar/sidebar.component';
import Header from '../../components/Header/header.component';
import DevicesBody from '../../components/DevicesBody/devicesBody.component';
import styles from './Home.module.css';
import BodyContainer from '../../components/Body/bodyContainer.component';

const Home = () => {
  return (
    <div className={styles["main-view"]}>
      <Sidebar />
      <div className={styles["content"]}>
        <Header />
        <BodyContainer>
          <DevicesBody/>
        </BodyContainer>
      </div>
    </div>
  );
};

export default Home;
import React from 'react';
import Sidebar from '../../components/Sidebar/sidebar.component';
import Header from '../../components/Header/header.component';
import DevicesBody from '../../components/DevicesBody/devicesBody.component';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles["main-view"]}>
      <Sidebar />
      <div className={styles["content"]}>
        <Header />
        <DevicesBody />
      </div>
    </div>
  );
};

export default Home;
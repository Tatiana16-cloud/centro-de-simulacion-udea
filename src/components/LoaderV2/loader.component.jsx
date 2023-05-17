import React from "react";
import Lottie from 'react-lottie';
import animationData from '../../resources/animations/97930-loading.json';
import "./loader.css";

const Loader = ({message}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="complex-loading-container">
      <Lottie options={defaultOptions} height={30} width={60} />
      <p>{message? message : 'Cargando información de equipos'}</p>
    </div>
  );
};

export default Loader;
import React from 'react';
import './circle.css';

const Circle = ({ color, size }) => {
  const circleStyle = {
    backgroundColor: color,
    width: `${size}px`,
    height: `${size}px`
  };

  return <div className="circle" style={circleStyle}></div>;
};

export default Circle;

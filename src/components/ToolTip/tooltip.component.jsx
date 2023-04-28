import React, { useState } from 'react';
import './tooltip.css';

const Tooltip = ({ children, label }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div
      className="tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && <div className="tooltip-label">{label}</div>}
    </div>
  );
};

export default Tooltip;
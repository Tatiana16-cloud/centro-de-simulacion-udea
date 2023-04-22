import React, { useState } from 'react';
import './menuDropDown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const MenuDropDown = ({menuItems}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedSubItemIndex, setSelectedSubItemIndex] = useState(null);


  const handleItemClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
    setSelectedSubItemIndex(-1);
  };

  const handleSubItemClick = (index) => {
    console.log(activeIndex, index)
    setSelectedSubItemIndex(index);
  };

  return (
    <div className="menu-container">
      {menuItems.map((menuItem, index) => (
        <div key={index}>
          <button className="menu-item" onClick={() => handleItemClick(index)}>
            <div>
              <FontAwesomeIcon icon={menuItem.icon} style={{ marginRight: '20px', color: 'white' }} />
              {menuItem.label}
            </div>
            <FontAwesomeIcon
              icon={activeIndex === index ? faChevronDown : faChevronRight}
              style={{ color: 'white' }}
            />
          </button>
            <ul className={`submenu ${activeIndex === index ? 'show' : ''}`}>
                {menuItem.submenu.map((submenuItem, idx) => (
                    <li 
                    key={idx} 
                    className={`submenu-item ${selectedSubItemIndex === idx ? 'selected' : ''}`}
                    onClick={() => handleSubItemClick(idx)}>
                    <FontAwesomeIcon icon={submenuItem.icon} style={{ marginRight: '8px', color: 'rgba(255, 255, 255, 0.716)' }} />
                    {submenuItem.label}
                    </li>
                ))}
            </ul>
        </div>
      ))}
    </div>
  );
};

export default MenuDropDown;

import React, { useEffect, useState } from 'react';
import './menuDropDown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const MenuDropDown = ({
  menuItems, 
  onItemClick, 
  initialActiveIndex = -1,
  initialSelectedSubItemIndex = -1
}) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [selectedSubItemIndex, setSelectedSubItemIndex] = useState(initialSelectedSubItemIndex);

  const handleItemClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
    setSelectedSubItemIndex(-1);
  };

  const handleSubItemClick = (index) => {
    setSelectedSubItemIndex(index);
    onItemClick(activeIndex, index)
  };

  useEffect(()=>{
    setActiveIndex(initialActiveIndex)
    setSelectedSubItemIndex(initialSelectedSubItemIndex)
  }, [initialActiveIndex, initialSelectedSubItemIndex])

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
                    <FontAwesomeIcon icon={submenuItem.icon} style={{ marginRight: '20px', color: 'rgba(255, 255, 255, 0.716)' }} />
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

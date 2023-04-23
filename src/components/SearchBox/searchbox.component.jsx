import React from 'react';
import './searchbox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBox = () => {
  return (
    <div className="search-container">
      <button className="search-button">
        <FontAwesomeIcon icon={faSearch} />
      </button>
      <input className="search-input" type="text" placeholder="Buscar..." />
    </div>
  );
};

export default SearchBox;
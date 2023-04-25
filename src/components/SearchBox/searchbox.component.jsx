import React, { useRef } from 'react';
import './searchbox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBox = ({ onSearch }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    const inputValue = inputRef.current.value;
    onSearch(inputValue);
  };

  return (
    <div className="search-container">
      <button className="search-button" onClick={handleClick}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
      <input
        className="search-input"
        type="text"
        placeholder="Buscar..."
        ref={inputRef}
      />
    </div>
  );
};

export default SearchBox;
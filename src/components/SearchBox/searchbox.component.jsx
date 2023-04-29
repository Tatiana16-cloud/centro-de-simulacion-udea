import React, { useRef, useState } from 'react';
import './searchbox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBox = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef(null);

  const handleClick = () => {
    onSearch(searchValue);
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="search-container">
      <button className="search-button" onClick={handleClick}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
      <input
        className="search-input"
        type="text"
        placeholder="Buscar"
        ref={inputRef}
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;
import React, { useState } from 'react';
import './styles.css';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const Search = ({ search, onSearchChange }) => {
  const [localSearch, setLocalSearch] = useState("");

  return (
    <div className="search-flex">
      <SearchRoundedIcon />
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => {
          setLocalSearch(e.target.value);
          onSearchChange(e);
        }}
      />
    </div>
  );
};

export default Search;

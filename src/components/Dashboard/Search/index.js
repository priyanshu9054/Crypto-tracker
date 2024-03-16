import React, { useState } from 'react'
import "./styles.css"
import SearchIcon from '@mui/icons-material/Search';

function Search({ search, onSearchChange}) {
  return (
    <div className='search-flex'>
        <SearchIcon />
        <input 
            placeholder='Search' 
            type='text'
            value={search}
            onChange={(e) => onSearchChange(e)}
        />
    </div>
  );
}

export default Search
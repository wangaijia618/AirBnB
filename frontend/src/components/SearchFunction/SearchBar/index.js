import { useState } from 'react';
import { useHistory } from "react-router-dom";
import './SearchBar.css'

function SearchBar({searchFunc}) {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = searchFunc

  // console.log('searchTerm-----', searchTerm)

  const handleSubmit = async (e) => {
    e.preventDefault() 
    history.push(`/spotss/search`)
  }

  return (
    <form className='search-bar-container' onSubmit={handleSubmit}>
      <input type='text'
        placeholder='Search...  (e.g. New York, Connecticut, etc.)'
        className='search-bar'
        onChange={(e) => { setSearchTerm(e.target.value) }}
      />

      <button className="search-button" type="submit">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
}

export default SearchBar;

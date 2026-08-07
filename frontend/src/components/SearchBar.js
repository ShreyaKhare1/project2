import React from 'react';
import { useState } from 'react';
function SearchBar({onSearch}) {
  const[ticker,setTicker]=useState("");
  const handleSubmit=()=>{
        onSearch(ticker.trim());
  }
  return ( 
    <>
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        
        onChange={(e) => setTicker(e.target.value)}
        placeholder="Enter ticker (e.g. AAPL)"
      />
      <button type="submit">Analyze</button>
    </form>
    </>
   );
}

export default SearchBar;
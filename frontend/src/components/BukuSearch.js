import React, { useState } from 'react';


const BukuSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
  
    const handleSearch = async () => {
      try {
        const response = await fetch(`/api/buku/search?q=${query}`);
        const data = await response.json();
        setResults(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setResults([]);
      }
    };
  
    return (
      <div className="search">
        <input
          className='searchInput'
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari buku...."
        />
        <button className='searchButton' onClick={handleSearch}>Cari Buku</button>
        {results.length > 0 ? (
          <ul>
            {results.map((buku) => (
              <li key={buku._id}>{buku.judul} - {buku.penulis} {buku.penerbit} - {buku.genre}</li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  };
  
  export default BukuSearch;
  
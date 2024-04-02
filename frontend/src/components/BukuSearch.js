import React, { useState } from 'react';

const BukuSearch = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    return (
        <div className="search">
            <input
                className='searchInput'
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari buku...."
            />
            <button className='searchButton' onClick={() => onSearch(query)}>Cari Buku</button>
        </div>
    );
};

export default BukuSearch;

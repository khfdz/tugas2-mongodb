import React from 'react';
import { Link } from 'react-router-dom';
import BukuSearch from './BukuSearch';

const Navbar = ({ onSearch }) => {
    return (
        <header>
            <div className='container'>
                <Link to='/'>
                    <h1>Perpustakaan Sederhana</h1>
                </Link>
                <BukuSearch onSearch={onSearch} />
            </div>
        </header>
    );
}

export default Navbar;

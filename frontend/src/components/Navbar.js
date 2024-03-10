import { Link } from 'react-router-dom'
import BukuSearch from './BukuSearch'

const Navbar = () => {
    
    return (
        <header>
            <div className='container'>
                <Link to='/'>
                    <h1>Perpustakaan Sederhana</h1>
                    
                </Link>
                <BukuSearch />
                
                
                {/* <input type="text" placeholder="Masukan Judul atau Penulis atau Penerbit atau Genre Buku" className='searchInput'></input>
                <button type="button" className='searchButton'>Cari Buku</button> */}
            </div>

        </header>
    )
}

export default Navbar
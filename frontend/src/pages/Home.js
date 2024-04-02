import React, { useEffect, useState } from 'react'
import { useBukuContext } from '../hooks/useBukuContext'

// Components
import BukuDetails from '../components/BukuDetails'
import BukuForm from '../components/BukuForm'
import Navbar from '../components/Navbar'
import TombolNavigasi from '../components/TombolNavigasi'

const Home = () => {
    const { buku, dispatch } = useBukuContext()
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchBuku = async (query, page) => {
        const response = await fetch(`/api/buku/?q=${query}&page=${page}`);
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'SET_BUKU', payload: json.buku })
            setTotalPages(json.totalPages);
        }
    }

    useEffect(() => {
        fetchBuku('', currentPage);
    }, [dispatch, currentPage])

    const handleSearch = (query) => {
        fetchBuku(query, 1);
    };

    const handleNextPage = () => {
        fetchBuku('', currentPage + 1);
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        fetchBuku('', currentPage - 1);
        setCurrentPage(currentPage - 1);
    };


    return (
        <div className="App">
            <Navbar onSearch={handleSearch}/>
            <div className="home">
                <div className="buku">
                    {buku && buku.map((buku) => (
                        <BukuDetails key={buku._id} buku={buku} />
                    ))}
                    <TombolNavigasi
                    onPreviousClick={handlePreviousPage}
                    onNextClick={handleNextPage}
                    hasPrevious={currentPage > 1}
                    hasNext={currentPage < totalPages} 
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
                </div>
                <BukuForm />
            </div>
        </div>
    )
}

export default Home

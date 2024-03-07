import { useEffect } from 'react'
import { useBukuContext } from '../hooks/useBukuContext'

// Components
import BukuDetails from '../components/BukuDetails'
import BukuForm from '../components/BukuForm'

const Home = () => {
    const {buku, dispatch} = useBukuContext()
    
    useEffect(() => {
        const fetchBuku = async () => {
            const response = await fetch('/api/buku')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_BUKU', payload: json})
            }
        }
        
        fetchBuku()
    }, [])

    return (
        <div className="home">
            <div className="buku">
                {buku && buku.map((buku) => (
                    <BukuDetails key={buku._id} buku={buku} />  
                ))}
        </div>
        <BukuForm />
        </div>
    )
}

export default Home
import { useState } from "react"
import { useBukuContext } from '../hooks/useBukuContext'

const BukuForm = () => {
    const { dispatch } = useBukuContext()

    const [judul, setJudul] = useState('')
    const [penulis, setPenulis] = useState('')
    const [penerbit, setPenerbit] = useState('')
    const [genre, setGenre] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const buku = {judul, penulis, penerbit, genre}

        const response = await fetch('/api/buku', {
            method: 'POST',
            body: JSON.stringify(buku),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setJudul('')        
            setPenulis('')
            setPenerbit('')
            setGenre('')
            setError(null)
            setEmptyFields([])
            console.log('new buku added', json)
            dispatch({type: 'CREATE_BUKU', payload: json})
        }
    }


    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Tambah Buku Baru</h3>

            <label>Judul Buku</label>
            <input 
                type="text"
                onChange={(e) => setJudul(e.target.value)}
                value={judul}
                className={emptyFields.includes('judul') ? 'error' : ''}
            />

            <label>Penulis</label>
            <input 
                type="text"
                onChange={(e) => setPenulis(e.target.value)}
                value={penulis}
                className={emptyFields.includes('penulis') ? 'error' : ''}
            />

            <label>Penerbit</label>
            <input 
                type="text"
                onChange={(e) => setPenerbit(e.target.value)}
                value={penerbit}
                className={emptyFields.includes('penerbit') ? 'error' : ''}
            />

            <label>Genre</label>
            <input 
                type="text"
                onChange={(e) => setGenre(e.target.value)}
                value={genre}
                className={emptyFields.includes('genre') ? 'error' : ''}
            />

            <button type="submit" className="simpan">Simpan</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default BukuForm
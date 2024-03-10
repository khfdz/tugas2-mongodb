import { useState } from "react"
import { useBukuContext } from "../hooks/useBukuContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const BukuDetails = ({ buku }) => {
    const { dispatch } = useBukuContext()
    const [showEditPopup, setShowEditPopup] = useState(false)
    const [editedData, setEditData] = useState({
        judul: buku.judul,
        penulis: buku.penulis,
        penerbit: buku.penerbit,
        genre: buku.genre
    })

    const handleClick = async () => {
        const response = await fetch(`/api/buku/${buku._id}`, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_BUKU', payload: json})
        }
    }

    const handleEdit = () => {
        setShowEditPopup(true);
    }

    const handleClickEdit = async (e) => {
        e.preventDefault();
        setShowEditPopup(false);
        const response = await fetch(`/api/buku/${buku._id}`, {
            method: 'PATCH',
            body: JSON.stringify(editedData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        
        if (response.ok) {
            dispatch({type: 'UPDATE_BUKU', payload: json})
        }
    }

    return (
        <div className="buku-details">
            <h4>{buku.judul}</h4>
            <p>Penulis: {buku.penulis}</p>
            <p>Penerbit: {buku.penerbit}</p>
            <p>Genre: {buku.genre}</p>
            <p>{formatDistanceToNow(new Date(buku.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined delete" onClick={handleClick}>delete</span>
            <span className="material-symbols-outlined edit" onClick={handleEdit}>edit</span>
        
            {showEditPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>Edit Buku</h2>
                        <form onSubmit={handleClickEdit}>
                            <label>Judul</label>
                            <input
                                type="text"
                                onChange={(e) => setEditData({ ...editedData, judul: e.target.value })}
                                value={editedData.judul}
                            />
                            <label>Penulis</label>
                            <input
                                type="text"
                                onChange={(e) => setEditData({ ...editedData, penulis: e.target.value })}
                                value={editedData.penulis}
                            />
                            <label>Penerbit</label>
                            <input
                                type="text"
                                onChange={(e) => setEditData({ ...editedData, penerbit: e.target.value })}
                                value={editedData.penerbit}
                            />
                            <label>Genre</label>
                            <input
                                type="text"
                                onChange={(e) => setEditData({ ...editedData, genre: e.target.value })}
                                value={editedData.genre}
                            />
                            <button type="submit" className="update">Update</button>
                            <button className="cancel" onClick={() => setShowEditPopup(false)}>Cancel</button>
                        </form>
                    </div>    
                </div>
            )}
        </div>
    )
}

export default BukuDetails

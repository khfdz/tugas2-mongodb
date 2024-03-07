import { useBukuContext } from "../hooks/useBukuContext"

const BukuDetails = ({ buku }) => {
    const { dispatch } = useBukuContext()

    const handleClick = async () => {
        // const response = await fetch('/api/buku/' + buku._id, {
        const response = await fetch(`/api/buku/${buku._id}`, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_BUKU', payload: json})
        }
    }

    return (
        <div className="buku-details">
            <h4>{buku.judul}</h4>
            <p>Penulis: {buku.penulis}</p>
            <p>Penerbit: {buku.penerbit}</p>
            <p>Genre: {buku.genre}</p>
            <p>{buku.createdAt}</p>
            <span onClick={handleClick}>delete</span>
        </div>
    )
}

export default BukuDetails
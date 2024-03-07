import  { createContext, useReducer } from 'react';

export const BukuContext = createContext()

export const bukuReducer = (state, action) => {
    switch(action.type) {
        case 'SET_BUKU':
            return {
                buku: action.payload
            }
        case 'CREATE_BUKU':
            return {
                buku: [action.payload, ...state.buku]
            }
        case 'DELETE_BUKU':
            return {
                buku: state.buku.filter((b) => b._id !== action.payload._id)
            }
        default:
            return state
    }
} 

export const BukuContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(bukuReducer, {
        buku: null
    })

    return (
        <BukuContext.Provider value={{...state, dispatch}}>
            { children }
        </BukuContext.Provider>
    )
}
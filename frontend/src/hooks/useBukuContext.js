import { BukuContext } from "../context/BukuContext";
import { useContext } from "react";


export const useBukuContext = () => {
    const context = useContext(BukuContext)

    if (!context) {
        throw Error('useBukuContext must be used inside an BukuContextProvider')
    }

    return context
}
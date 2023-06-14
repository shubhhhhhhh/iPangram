import { useState } from "react";
import { MainContext } from "./Context";

export default function GlobalContext({ children }) {
    const [idinfo, setIdinfo] = useState()

    function dd(info) {
        if (info)
            setIdinfo({ name: info })
        else{
            setIdinfo()
        }
    }

    const value = {
        id: idinfo,
        setid: dd
    }

    return (
        <>
            <MainContext.Provider value={value}>
                {children}
            </MainContext.Provider>
        </>
    )
} 
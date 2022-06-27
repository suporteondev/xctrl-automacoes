import React, { useState } from "react"

export const PerfisContext = React.createContext({})

export const PerfisProvider = ({ children }) => {
    const [ perfis, setPerfis ] = useState([])
    return <PerfisContext.Provider value={{ perfis, setPerfis }}>{children}</PerfisContext.Provider>
}

export const usePerfis = ()=> React.useContext(PerfisContext)
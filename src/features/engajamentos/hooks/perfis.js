import React, { useEffect, useState } from 'react'
import { filtrarTodosPerfis } from '../functions/filtrarTodosPerfis'

export const PerfisContext = React.createContext({})

export const PerfisProvider = ({ children }) => {

    const [ perfis, setPerfis ] = useState([])

    useEffect(async()=>{
        await filtrarTodosPerfis(setPerfis)
    }, [setPerfis])

    return <PerfisContext.Provider value={{ perfis, setPerfis }}>{children}</PerfisContext.Provider>
}

export const usePerfis = ()=> React.useContext(PerfisContext)
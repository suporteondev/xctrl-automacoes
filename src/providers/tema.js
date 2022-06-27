import React, { useState, useEffect } from "react"

// TemaContext
export const TemaContext = React.createContext({})

// TemaProvider
export const TemaProvider = ({ children }) => {

    // Temas
    const [ tema, setTema ] = useState('light')

    useEffect(()=>{
        if(
            window.api.ipcRenderer.sendSync('tema') != false &&
            window.api.ipcRenderer.sendSync('tema') != undefined &&
            window.api.ipcRenderer.sendSync('tema') != undefined
        ){
            setTema(window.api.ipcRenderer.sendSync('tema'))
        }
    }, [])

    return <TemaContext.Provider value={{ tema, setTema }}>{children}</TemaContext.Provider>
}

// Hook
export const useTema = ()=> React.useContext(TemaContext)
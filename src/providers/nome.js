import React, { useState, useEffect } from "react"

// NomeContext
export const NomeContext = React.createContext({})

// NomeProvider
export const NomeProvider = ({ children }) => {

    // Nomes
    const [ nome, setNome ] = useState('')

    useEffect(()=>{
        if(
            window.api.ipcRenderer.sendSync('nome') != false &&
            window.api.ipcRenderer.sendSync('nome') != undefined &&
            window.api.ipcRenderer.sendSync('nome') != undefined
        ){
            setNome(window.api.ipcRenderer.sendSync('nome'))
        }
    }, [])

    return <NomeContext.Provider value={{ nome, setNome }}>{children}</NomeContext.Provider>
}

// Hook
export const useNome = ()=> React.useContext(NomeContext)
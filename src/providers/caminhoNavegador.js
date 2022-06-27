import React, { useState, useEffect } from "react"

// CaminhoNavegadorContext
export const CaminhoNavegadorContext = React.createContext({})

// CaminhoNavegadorProvider
export const CaminhoNavegadorProvider = ({ children }) => {

    // CaminhoNavegadors
    const [ caminhoNavegador, setCaminhoNavegador ] = useState('')

    useEffect(()=>{
        if(
            window.api.ipcRenderer.sendSync('caminhoNavegador') != false &&
            window.api.ipcRenderer.sendSync('caminhoNavegador') != undefined &&
            window.api.ipcRenderer.sendSync('caminhoNavegador') != undefined
        ){
            setCaminhoNavegador(window.api.ipcRenderer.sendSync('caminhoNavegador'))
        }
    }, [])

    return <CaminhoNavegadorContext.Provider value={{ caminhoNavegador, setCaminhoNavegador }}>{children}</CaminhoNavegadorContext.Provider>
}

// Hook
export const useCaminhoNavegador = ()=> React.useContext(CaminhoNavegadorContext)
import React, { useState, useEffect } from "react"

// ConfiguracoesRealizadorContext
export const ConfiguracoesRealizadorContext = React.createContext({})

// ConfiguracoesRealizadorProvider
export const ConfiguracoesRealizadorProvider = ({ children }) => {

    // ConfiguracoesRealizadors
    const [ configuracoesRealizador, setConfiguracoesRealizador ] = useState({})

    useEffect(()=>{
        if(
            window.api.ipcRenderer.sendSync('configuracoesRealizador') != false &&
            window.api.ipcRenderer.sendSync('configuracoesRealizador') != undefined &&
            window.api.ipcRenderer.sendSync('configuracoesRealizador') != undefined
        ){
            setConfiguracoesRealizador(window.api.ipcRenderer.sendSync('configuracoesRealizador'))
        }
    }, [])

    return <ConfiguracoesRealizadorContext.Provider value={{ configuracoesRealizador, setConfiguracoesRealizador }}>{children}</ConfiguracoesRealizadorContext.Provider>
}

// Hook
export const useConfiguracoesRealizador = ()=> React.useContext(ConfiguracoesRealizadorContext)
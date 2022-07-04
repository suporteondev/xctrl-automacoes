import React, { useState, useEffect } from "react"

// ConfiguracoesRemovedorContext
export const ConfiguracoesRemovedorContext = React.createContext({})

// ConfiguracoesRemovedorProvider
export const ConfiguracoesRemovedorProvider = ({ children }) => {

    // ConfiguracoesRemovedors
    const [ configuracoesRemovedor, setConfiguracoesRemovedor ] = useState({})

    useEffect(()=>{
        if(
            window.api.ipcRenderer.sendSync('configuracoesRemovedor') != false &&
            window.api.ipcRenderer.sendSync('configuracoesRemovedor') != undefined &&
            window.api.ipcRenderer.sendSync('configuracoesRemovedor') != undefined
        ){
            setConfiguracoesRemovedor(window.api.ipcRenderer.sendSync('configuracoesRemovedor'))
        }
    }, [])

    return <ConfiguracoesRemovedorContext.Provider value={{ configuracoesRemovedor, setConfiguracoesRemovedor }}>{children}</ConfiguracoesRemovedorContext.Provider>
}

// Hook
export const useConfiguracoesRemovedor = ()=> React.useContext(ConfiguracoesRemovedorContext)
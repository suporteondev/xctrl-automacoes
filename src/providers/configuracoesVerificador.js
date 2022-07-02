import React, { useState, useEffect } from "react"

// ConfiguracoesVerificadorContext
export const ConfiguracoesVerificadorContext = React.createContext({})

// ConfiguracoesVerificadorProvider
export const ConfiguracoesVerificadorProvider = ({ children }) => {

    // ConfiguracoesVerificadors
    const [ configuracoesVerificador, setConfiguracoesVerificador ] = useState({})

    useEffect(()=>{
        if(
            window.api.ipcRenderer.sendSync('configuracoesVerificador') != false &&
            window.api.ipcRenderer.sendSync('configuracoesVerificador') != undefined &&
            window.api.ipcRenderer.sendSync('configuracoesVerificador') != undefined
        ){
            setConfiguracoesVerificador(window.api.ipcRenderer.sendSync('configuracoesVerificador'))
        }
    }, [])

    return <ConfiguracoesVerificadorContext.Provider value={{ configuracoesVerificador, setConfiguracoesVerificador }}>{children}</ConfiguracoesVerificadorContext.Provider>
}

// Hook
export const useConfiguracoesVerificador = ()=> React.useContext(ConfiguracoesVerificadorContext)
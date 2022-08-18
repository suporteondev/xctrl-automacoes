import React, { useState, useEffect } from "react"

// ConfiguracoesAdicionadorContext
export const ConfiguracoesAdicionadorContext = React.createContext({})

// ConfiguracoesAdicionadorProvider
export const ConfiguracoesAdicionadorProvider = ({ children }) => {

    // ConfiguracoesAdicionadors
    const [ configuracoesAdicionador, setConfiguracoesAdicionador ] = useState({})

    useEffect(()=>{
        if(
            window.api.ipcRenderer.sendSync('configuracoesAdicionador') != false &&
            window.api.ipcRenderer.sendSync('configuracoesAdicionador') != undefined &&
            window.api.ipcRenderer.sendSync('configuracoesAdicionador') != undefined
        ){
            setConfiguracoesAdicionador(window.api.ipcRenderer.sendSync('configuracoesAdicionador'))
        }
    }, [])

    return <ConfiguracoesAdicionadorContext.Provider value={{ configuracoesAdicionador, setConfiguracoesAdicionador }}>{children}</ConfiguracoesAdicionadorContext.Provider>
}

// Hook
export const useConfiguracoesAdicionador = ()=> React.useContext(ConfiguracoesAdicionadorContext)
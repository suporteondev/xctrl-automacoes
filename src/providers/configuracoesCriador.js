import React, { useState, useEffect } from "react"

// ConfiguracoesCriadorContext
export const ConfiguracoesCriadorContext = React.createContext({})

// ConfiguracoesCriadorProvider
export const ConfiguracoesCriadorProvider = ({ children }) => {

    // ConfiguracoesCriadors
    const [ configuracoesCriador, setConfiguracoesCriador ] = useState({})

    useEffect(()=>{
        if(
            window.api.ipcRenderer.sendSync('configuracoesCriador') != false &&
            window.api.ipcRenderer.sendSync('configuracoesCriador') != undefined &&
            window.api.ipcRenderer.sendSync('configuracoesCriador') != undefined
        ){
            setConfiguracoesCriador(window.api.ipcRenderer.sendSync('configuracoesCriador'))
        }
    }, [])

    return <ConfiguracoesCriadorContext.Provider value={{ configuracoesCriador, setConfiguracoesCriador }}>{children}</ConfiguracoesCriadorContext.Provider>
}

// Hook
export const useConfiguracoesCriador = ()=> React.useContext(ConfiguracoesCriadorContext)
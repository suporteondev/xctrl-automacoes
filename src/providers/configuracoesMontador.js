import React, { useState, useEffect } from "react"

// ConfiguracoesMontadorContext
export const ConfiguracoesMontadorContext = React.createContext({})

// ConfiguracoesMontadorProvider
export const ConfiguracoesMontadorProvider = ({ children }) => {

    // ConfiguracoesMontadors
    const [ configuracoesMontador, setConfiguracoesMontador ] = useState({})

    useEffect(()=>{
        if(
            window.api.ipcRenderer.sendSync('configuracoesMontador') != false &&
            window.api.ipcRenderer.sendSync('configuracoesMontador') != undefined &&
            window.api.ipcRenderer.sendSync('configuracoesMontador') != undefined
        ){
            setConfiguracoesMontador(window.api.ipcRenderer.sendSync('configuracoesMontador'))
        }
    }, [])

    return <ConfiguracoesMontadorContext.Provider value={{ configuracoesMontador, setConfiguracoesMontador }}>{children}</ConfiguracoesMontadorContext.Provider>
}

// Hook
export const useConfiguracoesMontador = ()=> React.useContext(ConfiguracoesMontadorContext)
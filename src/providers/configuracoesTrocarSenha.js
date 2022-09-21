import React, { useState, useEffect } from "react"

// ConfiguracoesTrocarSenhaContext
export const ConfiguracoesTrocarSenhaContext = React.createContext({})

// ConfiguracoesTrocarSenhaProvider
export const ConfiguracoesTrocarSenhaProvider = ({ children }) => {

    // ConfiguracoesTrocarSenhas
    const [ configuracoesTrocarSenha, setConfiguracoesTrocarSenha ] = useState({})

    useEffect(()=>{
        if(
            window.api.ipcRenderer.sendSync('configuracoesTrocarSenha') != false &&
            window.api.ipcRenderer.sendSync('configuracoesTrocarSenha') != undefined &&
            window.api.ipcRenderer.sendSync('configuracoesTrocarSenha') != undefined
        ){
            setConfiguracoesTrocarSenha(window.api.ipcRenderer.sendSync('configuracoesTrocarSenha'))
        }
    }, [])

    return <ConfiguracoesTrocarSenhaContext.Provider value={{ configuracoesTrocarSenha, setConfiguracoesTrocarSenha }}>{children}</ConfiguracoesTrocarSenhaContext.Provider>
}

// Hook
export const useConfiguracoesTrocarSenha = ()=> React.useContext(ConfiguracoesTrocarSenhaContext)
import React, { useState, useEffect } from "react"

// ConfiguracoesSeguidoresContext
export const ConfiguracoesSeguidoresContext = React.createContext({})

// ConfiguracoesSeguidoresProvider
export const ConfiguracoesSeguidoresProvider = ({ children }) => {

    // ConfiguracoesSeguidoress
    const [ configuracoesSeguidores, setConfiguracoesSeguidores ] = useState({})

    useEffect(()=>{
        if(
            window.api.ipcRenderer.sendSync('configuracoesSeguidores') != false &&
            window.api.ipcRenderer.sendSync('configuracoesSeguidores') != undefined &&
            window.api.ipcRenderer.sendSync('configuracoesSeguidores') != undefined
        ){
            setConfiguracoesSeguidores(window.api.ipcRenderer.sendSync('configuracoesSeguidores'))
        }
    }, [])

    return <ConfiguracoesSeguidoresContext.Provider value={{ configuracoesSeguidores, setConfiguracoesSeguidores }}>{children}</ConfiguracoesSeguidoresContext.Provider>
}

// Hook
export const useConfiguracoesSeguidores = ()=> React.useContext(ConfiguracoesSeguidoresContext)
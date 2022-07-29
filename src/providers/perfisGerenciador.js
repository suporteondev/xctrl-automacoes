import React, { useState, useEffect } from "react"

// PerfisGerenciadorContext
export const PerfisGerenciadorContext = React.createContext({})

// PerfisGerenciadorProvider
export const PerfisGerenciadorProvider = ({ children }) => {

    // PerfisGerenciadors
    const [ perfisGerenciador, setPerfisGerenciador ] = useState([])

    useEffect(()=>{
        if(
            window.api.ipcRenderer.sendSync('perfisGerenciador') != false &&
            window.api.ipcRenderer.sendSync('perfisGerenciador') != undefined &&
            window.api.ipcRenderer.sendSync('perfisGerenciador') != undefined
        ){
            setPerfisGerenciador(window.api.ipcRenderer.sendSync('perfisGerenciador'))
        }
    }, [])

    return <PerfisGerenciadorContext.Provider value={{ perfisGerenciador, setPerfisGerenciador }}>{children}</PerfisGerenciadorContext.Provider>
}

// Hook
export const usePerfisGerenciador = ()=> React.useContext(PerfisGerenciadorContext)
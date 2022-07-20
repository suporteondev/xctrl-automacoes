import React, { useState, useEffect } from "react"

// UsuarioLogadoContext
export const UsuarioLogadoContext = React.createContext({})

// UsuarioLogadoProvider
export const UsuarioLogadoProvider = ({ children }) => {

    // UsuarioLogados
    const [ usuarioLogado, setUsuarioLogado ] = useState({
        nome: '',
        email: '',
        senha: ''
    })

    useEffect(()=>{
        if(
            window.api.ipcRenderer.sendSync('usuarioLogado') != false &&
            window.api.ipcRenderer.sendSync('usuarioLogado') != undefined &&
            window.api.ipcRenderer.sendSync('usuarioLogado') != 'undefined'
        ){
            setUsuarioLogado(window.api.ipcRenderer.sendSync('usuarioLogado'))
        }
    }, [])

    return <UsuarioLogadoContext.Provider value={{ usuarioLogado, setUsuarioLogado }}>{children}</UsuarioLogadoContext.Provider>
}

// Hook
export const useUsuarioLogado = ()=> React.useContext(UsuarioLogadoContext)
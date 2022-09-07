import React, { useState } from 'react'

// PerfisSelecionadosEngajamentosContext
export const PerfisSelecionadosEngajamentosContext = React.createContext({})

// PerfisSelecionadosEngajamentosProvider
export const PerfisSelecionadosEngajamentosProvider = ({ children }) => {

    // PerfisSelecionadosEngajamentoss
    const [ perfisSelecionadosEngajamentos, setPerfisSelecionadosEngajamentos ] = useState([])

    return <PerfisSelecionadosEngajamentosContext.Provider value={{ perfisSelecionadosEngajamentos, setPerfisSelecionadosEngajamentos }}>{children}</PerfisSelecionadosEngajamentosContext.Provider>
}

// Hook
export const usePerfisSelecionadosEngajamentos = ()=> React.useContext(PerfisSelecionadosEngajamentosContext)
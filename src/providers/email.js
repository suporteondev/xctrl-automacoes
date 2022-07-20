import React, { useState, useEffect } from "react"

// EmailContext
export const EmailContext = React.createContext({})

// EmailProvider
export const EmailProvider = ({ children }) => {

    // Emails
    const [ email, setEmail ] = useState('')

    useEffect(()=>{
        if(localStorage.getItem('email') && localStorage.getItem('email') != ''){
            setEmail(localStorage.getItem('email'))
        }
    })

    return <EmailContext.Provider value={{ email, setEmail }}>{children}</EmailContext.Provider>
}

// Hook
export const useEmail = ()=> React.useContext(EmailContext)
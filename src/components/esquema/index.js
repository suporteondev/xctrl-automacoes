
import { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { useTema } from '../../providers/tema'
import { EstiloGlobal } from '../../styles/estiloGlobal'
import { temaClaro, temaEscuro } from '../../styles/temas'
import { Cabeca } from '../cabeca/index'
import { Conteudos } from './components/conteudos'

const Esquema = ({ children })=>{

    const { tema } = useTema()

    return (
        <ThemeProvider theme={tema === 'light' ? temaClaro : temaEscuro}>
            <EstiloGlobal/>
            <Conteudos id='logs'>{children}</Conteudos>
        </ThemeProvider>
    )
}

export { Esquema }
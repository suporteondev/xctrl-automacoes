import { useTema } from '../../providers/tema'
import { Fundo } from './components/fundo'
import { Botao } from './components/botao'
import { trocarTema } from './functions/trocarTema'
import { useState, useEffect } from 'react'

const TrocarTema = ()=>{

    const { tema, setTema } = useTema()
    const [ alinhamento, setAlinhamento ] = useState('flex-end')

    useEffect(()=>{
        tema === 'light' ? setAlinhamento('flex-start') : setAlinhamento('flex-end')
    }, [tema])

    return (
        <Fundo 
            alinhamento={alinhamento}
            onClick={()=> {
                trocarTema(
                    tema, 
                    setTema, 
                    setAlinhamento
                )
            }}
        >
            <Botao/>
        </Fundo>
    )
}

export { TrocarTema }
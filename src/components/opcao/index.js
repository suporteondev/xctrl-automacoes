import { Fundo } from './components/fundo'

const Opcao = ({ children, funcao })=>{
    return (
        <Fundo onClick={()=> funcao()}>
            {children}
        </Fundo>
    )
}

export { Opcao }
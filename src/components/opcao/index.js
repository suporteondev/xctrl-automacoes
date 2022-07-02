import { Fundo } from './components/fundo'

const Opcao = ({ children, funcao, cor })=>{
    return (
        <Fundo onClick={()=> funcao()} cor={cor}>
            {children}
        </Fundo>
    )
}

export { Opcao }
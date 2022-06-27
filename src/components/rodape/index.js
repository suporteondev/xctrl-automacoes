import { CaixaRodape } from './components/caixaRodape'
import { Opcoes } from './components/opcoes'
import { TrocarTema } from '../trocarTema/index'

const Rodape = ({ children, blur })=>{
    return(
        <CaixaRodape blur={blur}>
            <Opcoes>{children}</Opcoes>
            <TrocarTema/>
        </CaixaRodape>
    )
}

export { Rodape }
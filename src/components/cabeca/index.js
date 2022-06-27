import { CaixaCabeca } from './components/caixaCabeca'
import { Esquerda } from './components/esquerda'
import { Logo } from './components/logo'
import { Titulo } from './components/titulo'
import { Direita } from './components/direita'
import { Circulo } from './components/circulo'
import { sair } from './functions/sair'
import { minimizar } from './functions/minimizar'
import { fechar } from './functions/fechar'
import { useNavigate } from 'react-router-dom'
import logoSVG from './svg/logo.svg'
import { redirecionar } from '../../functions/redirecionar'
import { maximizar as maximize } from './functions/maximizar'

const Cabeca = ({ voltar, blur })=>{

    const Router = useNavigate()

    return(
        <CaixaCabeca blur={blur}>
            <Esquerda>
                <Logo src={logoSVG}/>
                <Titulo>XCtrl</Titulo>
            </Esquerda>
            <Direita>
                {voltar === 'false' ? '' : 
                    <Circulo corFundo='#FFF50D' onClick={() => {
                        voltar === undefined ? sair(Router) : redirecionar(Router, voltar)
                    }}>&crarr;</Circulo>
                }
                <Circulo corFundo='orange' onClick={minimizar}>-</Circulo>
                <Circulo corFundo='#E53535' onClick={fechar} >X</Circulo>
            </Direita>
        </CaixaCabeca>
    )
}

export { Cabeca }
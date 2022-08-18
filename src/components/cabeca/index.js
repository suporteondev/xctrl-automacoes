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
import minimizarIMG from './svg/minimizar.svg'
import voltarIMG from './svg/voltar.svg'
import fecharIMG from './svg/fechar.svg'
import { redirecionar } from '../../functions/redirecionar'
import { FaMinus, FaTimes, FaReply } from "react-icons/fa";
import { MdUndo } from "react-icons/md";


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
                    <Circulo onClick={() => {
                        voltar === undefined ? sair(Router) : redirecionar(Router, voltar)
                    }}>
                        <MdUndo/>
                    </Circulo>
                }
                <Circulo onClick={minimizar}>
                    <FaMinus/>
                </Circulo>
                <Circulo onClick={fechar}>
                    <FaTimes/>
                </Circulo>
            </Direita>
        </CaixaCabeca>
    )
}

export { Cabeca }
import { Conteudos } from './components/conteudos'
import { Cabeca } from '../../components/cabeca'
import { Rodape } from '../../components/rodape'
import { Titulo } from './components/titulo'
import { Opcao } from '../../components/opcao'
import tempoIMG from '../../assets/svg/tempo.svg'
import tutorialIMG from '../../assets/svg/tutorial.svg'
import salvarIMG from '../../assets/svg/salvar.svg'
import iniciarIMG from '../../assets/svg/iniciar.svg'

const Realizador = ()=>{
    return (
        <>
            <Cabeca voltar='/painel'/>
            <Conteudos>
                <Titulo>Realizador de ações</Titulo>
            </Conteudos>
            <Rodape>
                <Opcao>
                    <span>Encerra dia 29/06/2022</span>
                    <img src={tempoIMG}/>
                </Opcao>
                <Opcao>
                    <span>Manual de uso</span>
                    <img src={tutorialIMG}/>
                </Opcao>
                <Opcao>
                    <span>Salvar configurações</span>
                    <img src={salvarIMG}/>
                </Opcao>
                <Opcao>
                    <span>Iniciar</span>
                    <img src={iniciarIMG}/>
                </Opcao>
            </Rodape>
        </>
    )
}

export { Realizador }
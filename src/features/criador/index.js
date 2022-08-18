import { Conteudos } from './components/conteudos'
import { Configuracoes } from './components/configuracoes'
import { Cabeca } from '../../components/cabeca'
import { Rodape } from '../../components/rodape'
import { Titulo } from './components/titulo'
import { Caixa } from './components/caixa'
import { Etiqueta } from './components/etiqueta'
import { Entrada } from './components/entrada'
import { Opcao } from '../../components/opcao'
import { Select } from './components/select'
import { iniciar } from './functions/iniciar'
import { Mensagem } from './components/mensagem'
import { useState } from 'react'
import { useConfiguracoesCriador } from '../../providers/configuracoesCriador'
import { salvar } from './functions/salvar'
import { useAcessoCriador } from '../../providers/acessoCriador'
import { useAcessoMontador } from '../../providers/acessoMontador'
import { IoIosSave } from 'react-icons/io'
import { IoPlay, IoTime } from 'react-icons/io5'
import { userAgentsDesktop } from '../../userAgentsDesktop'

const Criador = ()=>{

    const [ mensagem, setMensagem ] = useState(<Mensagem></Mensagem>)
    const { acessoCriador } = useAcessoCriador()
    const { acessoMontador } = useAcessoMontador()
    const { configuracoesCriador, setConfiguracoesCriador } = useConfiguracoesCriador()
    const listaDeUserAgentsDesktop = [...new Set(userAgentsDesktop)]

    return (
        <>
            <Cabeca voltar='/painel'/>
            <Conteudos>
                <Titulo>Criador de perfis</Titulo>
                <Configuracoes>
                    <Caixa>
                        <Etiqueta>Navegador</Etiqueta>
                        <Select name='navegador' defaultValue={configuracoesCriador.navegador}>
                            <option value='google'>Google Chrome</option>
                            <option value='edge'>Edge</option>
                            <option value='brave'>Brave</option>
                        </Select>
                    </Caixa>
                    <Caixa>
                        <Etiqueta>Ver acontecendo</Etiqueta>
                        <Select name='verAcontecendo' defaultValue={configuracoesCriador.verAcontecendo}>
                            <option value='sim'>Sim</option>
                            <option value='nao'>Não</option>
                        </Select>
                    </Caixa>
                    <Caixa>
                        <Etiqueta>Navegador em modo anônimo</Etiqueta>
                        <Select name='navegadorAnonimo' defaultValue={configuracoesCriador.navegadorAnonimo}>
                            <option value='sim'>Sim</option>
                            <option value='nao'>Não</option>
                        </Select>
                    </Caixa>
                    <Caixa>
                        <Etiqueta>User Agent</Etiqueta>
                        <Select name='userAgent' defaultValue={configuracoesCriador.userAgent}>
                            <option value='aleatorio'>Aleatório</option>
                            {listaDeUserAgentsDesktop.map((userAgent, index)=> (
                                <option key={index} value={userAgent}>User Agent - {index + 1}</option>
                            ))}
                        </Select>
                    </Caixa>
                    <Caixa>
                        <Etiqueta>Email temporário</Etiqueta>
                        <Select name='emailTemporario' defaultValue={configuracoesCriador.emailTemporario}>
                            <option value='aleatorio'>Aleatório</option>
                            <option value='mailtm'>Mail.tm</option>
                            <option value='cryptogmail'>Cryptogmail</option>
                            <option value='disposablemail'>Disposablemail</option>
                        </Select>
                    </Caixa>
                    <Caixa>
                        <Etiqueta>Quantidade de perfis</Etiqueta>
                        <Entrada name='quantidadePerfis' type='number' defaultValue={configuracoesCriador.quantidadePerfis}/>
                    </Caixa>
                    <Caixa>
                        <Etiqueta>Senha dos perfis</Etiqueta>
                        <Entrada name='senhaPerfis' type='text' defaultValue={configuracoesCriador.senhaPerfis}/>
                    </Caixa>
                    <Caixa>
                        <Etiqueta>Gênero dos perfis</Etiqueta>
                        <Select name='generoPerfis' defaultValue={configuracoesCriador.generoPerfis}>
                            <option value='feminino'>Feminino</option>
                            <option value='masculino'>Masculino</option>
                        </Select>
                    </Caixa>
                    <Caixa>
                        <Etiqueta>Limpar atividade de login</Etiqueta>
                        <Select name='limparLogin' defaultValue={configuracoesCriador.limparLogin}>
                            <option value='sim'>Sim</option>
                            <option value='nao'>Não</option>
                        </Select>
                    </Caixa>
                    <Caixa>
                        <Etiqueta>Como salvar os perfis</Etiqueta>
                        <Select name='comoSalvar' defaultValue={configuracoesCriador.comoSalvar}>
                            <option value='linha'>Modo linha</option>
                            <option value='coluna'>Modo coluna</option>
                        </Select>
                    </Caixa>
                    <Caixa>
                        <Etiqueta>Esperar entre as ações (Segundos)</Etiqueta>
                        <Entrada name='esperarEntre' type='number' defaultValue={configuracoesCriador.esperarEntre}/>
                    </Caixa>
                    <Caixa>
                        <Etiqueta>Limpar a pasta Prefetch</Etiqueta>
                        <Select name='limparPastaPrefetch' defaultValue={configuracoesCriador.limparPastaPrefetch}>
                            <option value='sim'>Sim</option>
                            <option value='nao'>Não</option>
                        </Select>
                    </Caixa>
                    <Caixa>
                        <Etiqueta>Limpar a pasta Temp</Etiqueta>
                        <Select name='limparPastaTemp' defaultValue={configuracoesCriador.limparPastaTemp}>
                            <option value='sim'>Sim</option>
                            <option value='nao'>Não</option>
                        </Select>
                    </Caixa>
                    {acessoMontador.status == true ? 
                        <Caixa>
                            <Etiqueta>Montar perfis criados</Etiqueta>
                            <Select name='montarPerfis' defaultValue={configuracoesCriador.montarPerfis}>
                                <option value='sim'>Sim</option>
                                <option value='nao'>Não</option>
                            </Select>
                        </Caixa>
                        : 
                        <Caixa>
                            <Etiqueta>Montar perfis criados</Etiqueta>
                            <Select name='montarPerfis' defaultValue={configuracoesCriador.montarPerfis}>
                                <option value='nao'>Sem acesso</option>
                            </Select>
                        </Caixa>
                    }
                    {mensagem}
                </Configuracoes>
            </Conteudos>
            <Rodape>
                <Opcao>
                    {acessoCriador.data == 'Sem acesso' ? 
                        ''
                        :
                        <span>
                            {acessoCriador.data == 'permanente' ? 'Acesso permanente' : 'Seu plano expira dia ' + acessoCriador.data}
                        </span>
                    }
                    <IoTime/>
                </Opcao>
                <Opcao funcao={()=>{ salvar(Mensagem, setMensagem, setConfiguracoesCriador) }}>
                    <span>Salvar configurações</span>
                    <IoIosSave/>
                </Opcao>
                <Opcao 
                    funcao={()=>{ 
                        iniciar(
                            Mensagem, 
                            setMensagem
                        ) 
                    }}>
                    <span>Iniciar</span>
                    <IoPlay/>
                </Opcao>
            </Rodape>
        </>
    )
}

export { Criador }
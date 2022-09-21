import { HashRouter, Routes, Route } from 'react-router-dom'
import Acessar from './pages/acessar'
import Painel from './pages/painel'
import Gerenciador from './pages/gerenciador'
import ControleVps from './pages/controlevps'
import Verificador from './pages/verificador'
import TrocarSenha from './pages/trocarsenha'
import Criador from './pages/criador'
import Montador from './pages/montador'
import ComprarCriador from './pages/comprarcriador'
import ComprarMontador from './pages/comprarmontador'
import Comprar from './pages/comprar'
import Engajamentos from './pages/engajamentos'
import Adicionador from './pages/adicionador'
import Seguidores from './pages/seguidores'
import Realizador from './pages/realizador'
import Manual from './pages/manual'
import MegaPromocao from './pages/megapromocao'
import LogsMontador from './pages/logsmontador'
import LogsVerificador from './pages/logsverificador'
import { TemaProvider } from './providers/tema'
import { UsuarioLogadoProvider } from './providers/usuarioLogado'
import { AcessoCriadorProvider } from './providers/acessoCriador'
import { AcessoMontadorProvider } from './providers/acessoMontador'
import { AcessoGerenciadorProvider } from './providers/acessoGerenciador'
import { ConfiguracoesVerificadorProvider } from './providers/configuracoesVerificador'
import { ConfiguracoesCriadorProvider } from './providers/configuracoesCriador'
import { ConfiguracoesMontadorProvider } from './providers/configuracoesMontador'
import { PerfisGerenciadorProvider } from './providers/perfisGerenciador'
import { ConfiguracoesAdicionadorProvider } from './providers/configuracoesAdicionador'
import { ConfiguracoesSeguidoresProvider } from './providers/configuracoesSeguidores'
import { PerfisSelecionadosEngajamentosProvider } from './providers/perfisSelecionadosEngajamentos'
import { ConfiguracoesRealizadorProvider } from './providers/configuracoesRealizador'
import { ConfiguracoesTrocarSenhaProvider } from './providers/configuracoesTrocarSenha'

export default function App() {
    return (
        <ConfiguracoesTrocarSenhaProvider>
            <ConfiguracoesRealizadorProvider>
                <PerfisSelecionadosEngajamentosProvider>
                    <ConfiguracoesSeguidoresProvider>
                        <ConfiguracoesAdicionadorProvider>
                            <PerfisGerenciadorProvider>
                                <AcessoCriadorProvider>
                                    <AcessoMontadorProvider>
                                        <AcessoGerenciadorProvider>
                                            <ConfiguracoesMontadorProvider>
                                                <ConfiguracoesCriadorProvider>
                                                    <ConfiguracoesVerificadorProvider>
                                                        <UsuarioLogadoProvider>
                                                            <TemaProvider>
                                                                <HashRouter>
                                                                    <Routes>
                                                                        <Route exact path='/' element={<Acessar/>} />
                                                                        <Route exact path='/painel' element={<Painel/>} />
                                                                        <Route exact path='/seguidores' element={<Seguidores/>} />
                                                                        <Route exact path='/manual' element={<Manual/>} />
                                                                        <Route exact path='/comprar' element={<Comprar/>} />
                                                                        <Route exact path='/megapromocao' element={<MegaPromocao/>} />
                                                                        <Route exact path='/comprarcriador' element={<ComprarCriador/>} />
                                                                        <Route exact path='/comprarmontador' element={<ComprarMontador/>} />
                                                                        <Route exact path='/gerenciador' element={<Gerenciador/>} />
                                                                        <Route exact path='/controlevps' element={<ControleVps/>} />
                                                                        <Route exact path='/engajamentos' element={<Engajamentos/>} />
                                                                        <Route exact path='/realizador' element={<Realizador/>} />
                                                                        <Route exact path='/adicionador' element={<Adicionador/>} />
                                                                        <Route exact path='/verificador' element={<Verificador/>} />
                                                                        <Route exact path='/trocarsenha' element={<TrocarSenha/>} />
                                                                        <Route exact path='/criador' element={<Criador/>} />
                                                                        <Route exact path='/montador' element={<Montador/>} />
                                                                        <Route exact path='/logsmontador' element={<LogsMontador/>} />
                                                                        <Route exact path='/logsverificador' element={<LogsVerificador/>} />
                                                                    </Routes>
                                                                </HashRouter>
                                                            </TemaProvider>
                                                        </UsuarioLogadoProvider>
                                                    </ConfiguracoesVerificadorProvider>
                                                </ConfiguracoesCriadorProvider>
                                            </ConfiguracoesMontadorProvider>
                                        </AcessoGerenciadorProvider>
                                    </AcessoMontadorProvider>
                                </AcessoCriadorProvider>
                            </PerfisGerenciadorProvider>
                        </ConfiguracoesAdicionadorProvider>
                    </ConfiguracoesSeguidoresProvider>
                </PerfisSelecionadosEngajamentosProvider>
            </ConfiguracoesRealizadorProvider>
        </ConfiguracoesTrocarSenhaProvider>
    )
}
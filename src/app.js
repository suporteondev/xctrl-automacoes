import { HashRouter, Routes, Route } from 'react-router-dom'
import Acessar from './pages/acessar'
import Painel from './pages/painel'
import Gerenciador from './pages/gerenciador'
import Verificador from './pages/verificador'
import Criador from './pages/criador'
import Montador from './pages/montador'
import ComprarCriador from './pages/comprarcriador'
import ComprarMontador from './pages/comprarmontador'
import Comprar from './pages/comprar'
import Manual from './pages/manual'
import MegaPromocao from './pages/megapromocao'
import { TemaProvider } from './providers/tema'
import { UsuarioLogadoProvider } from './providers/usuarioLogado'
import { AcessoCriadorProvider } from './providers/acessoCriador'
import { AcessoMontadorProvider } from './providers/acessoMontador'
import { AcessoGerenciadorProvider } from './providers/acessoGerenciador'
import { ConfiguracoesVerificadorProvider } from './providers/configuracoesVerificador'
import { ConfiguracoesCriadorProvider } from './providers/configuracoesCriador'
import { ConfiguracoesMontadorProvider } from './providers/configuracoesMontador'
import { PerfisGerenciadorProvider } from './providers/perfisGerenciador'

export default function App() {
    return (
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
                                                    <Route exact path='/manual' element={<Manual/>} />
                                                    <Route exact path='/comprar' element={<Comprar/>} />
                                                    <Route exact path='/megapromocao' element={<MegaPromocao/>} />
                                                    <Route exact path='/comprarcriador' element={<ComprarCriador/>} />
                                                    <Route exact path='/comprarmontador' element={<ComprarMontador/>} />
                                                    <Route exact path='/gerenciador' element={<Gerenciador/>} />
                                                    <Route exact path='/verificador' element={<Verificador/>} />
                                                    <Route exact path='/criador' element={<Criador/>} />
                                                    <Route exact path='/montador' element={<Montador/>} />
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
    )
}
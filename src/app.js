import { HashRouter, Routes, Route } from 'react-router-dom'
import Acessar from './pages/acessar'
import Painel from './pages/painel'
import Gerenciador from './pages/gerenciador'
import Verificador from './pages/verificador'
import Removedor from './pages/removedor'
import Criador from './pages/criador'
import Montador from './pages/montador'
import ComprarCriador from './pages/comprarcriador'
import ComprarMontador from './pages/comprarmontador'
import Comprar from './pages/comprar'
import { TemaProvider } from './providers/tema'
import { UsuarioLogadoProvider } from './providers/usuarioLogado'
import { AcessoCriadorProvider } from './providers/acessoCriador'
import { AcessoMontadorProvider } from './providers/acessoMontador'
import { AcessoGerenciadorProvider } from './providers/acessoGerenciador'
import { ConfiguracoesVerificadorProvider } from './providers/configuracoesVerificador'
import { ConfiguracoesRemovedorProvider } from './providers/configuracoesRemovedor'
import { ConfiguracoesCriadorProvider } from './providers/configuracoesCriador'
import { ConfiguracoesMontadorProvider } from './providers/configuracoesMontador'

export default function App() {
    return (
        <AcessoCriadorProvider>
            <AcessoMontadorProvider>
                <AcessoGerenciadorProvider>
                    <ConfiguracoesMontadorProvider>
                        <ConfiguracoesCriadorProvider>
                            <ConfiguracoesRemovedorProvider>
                                <ConfiguracoesVerificadorProvider>
                                    <UsuarioLogadoProvider>
                                        <TemaProvider>
                                            <HashRouter>
                                                <Routes>
                                                    <Route exact path='/' element={<Acessar/>} />
                                                    <Route exact path='/painel' element={<Painel/>} />
                                                    <Route exact path='/comprar' element={<Comprar/>} />
                                                    <Route exact path='/comprarcriador' element={<ComprarCriador/>} />
                                                    <Route exact path='/comprarmontador' element={<ComprarMontador/>} />
                                                    <Route exact path='/gerenciador' element={<Gerenciador/>} />
                                                    <Route exact path='/verificador' element={<Verificador/>} />
                                                    <Route exact path='/criador' element={<Criador/>} />
                                                    <Route exact path='/montador' element={<Montador/>} />
                                                    <Route exact path='/removedor' element={<Removedor/>} />
                                                </Routes>
                                            </HashRouter>
                                        </TemaProvider>
                                    </UsuarioLogadoProvider>
                                </ConfiguracoesVerificadorProvider>
                            </ConfiguracoesRemovedorProvider>
                        </ConfiguracoesCriadorProvider>
                    </ConfiguracoesMontadorProvider>
                </AcessoGerenciadorProvider>
            </AcessoMontadorProvider>
        </AcessoCriadorProvider>
    )
}
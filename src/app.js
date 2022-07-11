import { HashRouter, Routes, Route } from 'react-router-dom'
import { ConfiguracoesVerificadorProvider } from './providers/configuracoesVerificador'
import { ConfiguracoesRemovedorProvider } from './providers/configuracoesRemovedor'
import { ConfiguracoesCriadorProvider } from './providers/configuracoesCriador'
import { TemaProvider } from './providers/tema'
import { EmailProvider } from './providers/email'
import { NomeProvider } from './providers/nome'
import Acessar from './pages/acessar'
import Painel from './pages/painel'
import Gerenciador from './pages/gerenciador'
import Verificador from './pages/verificador'
import Removedor from './pages/removedor'
import Criador from './pages/criador'
import Comprar from './pages/comprar'
import Suporte from './pages/suporte'

export default function App() {
    return (
        <ConfiguracoesCriadorProvider>
            <ConfiguracoesRemovedorProvider>
                <ConfiguracoesVerificadorProvider>
                    <EmailProvider>
                        <NomeProvider>
                            <TemaProvider>
                                <HashRouter>
                                    <Routes>
                                        <Route exact path='/' element={<Acessar/>} />
                                        <Route exact path='/painel' element={<Painel/>} />
                                        <Route exact path='/comprar' element={<Comprar/>} />
                                        <Route exact path='/suporte' element={<Suporte/>} />
                                        <Route exact path='/gerenciador' element={<Gerenciador/>} />
                                        <Route exact path='/verificador' element={<Verificador/>} />
                                        <Route exact path='/criador' element={<Criador/>} />
                                        <Route exact path='/removedor' element={<Removedor/>} />
                                    </Routes>
                                </HashRouter>
                            </TemaProvider>
                        </NomeProvider>
                    </EmailProvider>
                </ConfiguracoesVerificadorProvider>
            </ConfiguracoesRemovedorProvider>
        </ConfiguracoesCriadorProvider>
    )
}
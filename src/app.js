import { HashRouter, Routes, Route } from 'react-router-dom'
import { TemaProvider } from './providers/tema'
import { EmailProvider } from './providers/email'
import { NomeProvider } from './providers/nome'
import { CaminhoNavegadorProvider } from './providers/caminhoNavegador'
import Acessar from './pages/acessar'
import Painel from './pages/painel'
import Gerenciador from './pages/gerenciador'
import Criador from './pages/criador'
import Montador from './pages/montador'
import Engajamentos from './pages/engajamentos'
import Realizador from './pages/realizador'
import Removedor from './pages/removedor'
import Configuracoes from './pages/configuracoes'
import Comprar from './pages/comprar'
import Comprovantes from './pages/comprovantes'

export default function App() {
    return (
        <CaminhoNavegadorProvider>
            <EmailProvider>
                <NomeProvider>
                    <TemaProvider>
                        <HashRouter>
                            <Routes>
                                <Route exact path='/' element={<Acessar/>} />
                                <Route exact path='/painel' element={<Painel/>} />
                                <Route exact path='/configuracoes' element={<Configuracoes/>} />
                                <Route exact path='/comprar' element={<Comprar/>} />
                                <Route exact path='/comprovantes' element={<Comprovantes/>} />
                                <Route exact path='/criador' element={<Criador/>} />
                                <Route exact path='/engajamentos' element={<Engajamentos/>} />
                                <Route exact path='/montador' element={<Montador/>} />
                                <Route exact path='/gerenciador' element={<Gerenciador/>} />
                                <Route exact path='/realizador' element={<Realizador/>} />
                                <Route exact path='/removedor' element={<Removedor/>} />
                            </Routes>
                        </HashRouter>
                    </TemaProvider>
                </NomeProvider>
            </EmailProvider>
        </CaminhoNavegadorProvider>
    )
}
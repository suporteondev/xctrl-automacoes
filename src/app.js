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
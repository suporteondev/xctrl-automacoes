import { HashRouter, Routes, Route } from 'react-router-dom'
import { TemaProvider } from './providers/tema'
import { EmailProvider } from './providers/email'
import { NomeProvider } from './providers/nome'
import { CaminhoNavegadorProvider } from './providers/caminhoNavegador'
import Acessar from './pages/acessar'
import Painel from './pages/painel'
import Gerenciar from './pages/gerenciar'
import Verificar from './pages/verificar'
import RemoverPerfisGni from './pages/removerperfisgni'

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
                                <Route exact path='/gerenciar' element={<Gerenciar/>} />
                                <Route exact path='/verificar' element={<Verificar/>} />
                                <Route exact path='/removerperfisgni' element={<RemoverPerfisGni/>} />
                            </Routes>
                        </HashRouter>
                    </TemaProvider>
                </NomeProvider>
            </EmailProvider>
        </CaminhoNavegadorProvider>
    )
}
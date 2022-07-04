import { Fundo } from './components/fundo'
import { Loader } from './components/loader'
import { Mensagem } from './components/mensagem'

const Carregando = ({ display })=>{
    return (
        <div style={{ display: display, marginBottom: '5px' }}>
            <Loader/>
            <Mensagem>Carregando...</Mensagem>
        </div>
    )
}

export { Carregando }
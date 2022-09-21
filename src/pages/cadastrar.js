import { Esquema } from '../components/esquema/index'
import { Cadastrar } from '../features/cadastrar/index'

export default function Page(){
    return (
        <Esquema>
            <Cadastrar/>
        </Esquema>
    )
}
import styled from 'styled-components'

const Mensagem = styled.label`
    font-size: 14px;
    color: ${props => props.cor == 'sucesso' ? '#236EFF' : 'orange'};
    margin-bottom: 10px;
`

export { Mensagem }
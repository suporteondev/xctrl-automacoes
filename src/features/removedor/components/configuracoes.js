import styled from 'styled-components'

const Configuracoes = styled.div`
    display: ${props => props.display ? props.display : 'flex'};
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    margin-right: 10px;
`

export { Configuracoes }
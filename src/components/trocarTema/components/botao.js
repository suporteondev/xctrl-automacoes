import styled from 'styled-components'

const Botao = styled.div`
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: ${props => props.theme.textos};
`

export { Botao }
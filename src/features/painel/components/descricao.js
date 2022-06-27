import styled from 'styled-components'

const Descricao = styled.p`
    font-size: 14px;
    color: ${props => props.theme.textos};
    font-weight: 400;
    text-align: ${props => props.textAlign ? props.textAlign : 'justify'};
    margin-top: 5px;
`

export { Descricao }
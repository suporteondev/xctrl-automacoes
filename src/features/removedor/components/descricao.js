import styled from 'styled-components'

const Descricao = styled.p`
    font-size: 14px;
    color: ${props => props.theme.descricoes};
    font-weight: 400;
    text-align: center;
`

export { Descricao }
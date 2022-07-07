import styled from 'styled-components'

const Titulo = styled.h1`
    font-size: 18px;
    color: ${props => props.theme.textos};
    text-align: center;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 10px;
`

export { Titulo }
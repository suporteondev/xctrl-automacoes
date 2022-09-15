import styled from 'styled-components'

const Senha = styled.input`
    border: none;
    background-color: unset;
    font-family: 'Poppins', sans-serif;
    color: ${props => props.theme.textos};
    width: 100%;
    min-width: 110px;
    text-align: center;
    font-size: 12px;
`

export { Senha }
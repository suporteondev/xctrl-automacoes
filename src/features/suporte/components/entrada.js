import styled from 'styled-components'

const Entrada = styled.input`
    height: 40px;
    width: 100%;
    border: 0.5px solid ${props => props.theme.linhas};
    background-color: ${props => props.theme.fundos};
    border-radius: 5px;
    color: ${props => props.theme.textos};
    font-family: 'Poppins', sans-serif;
    padding: 0 10px;
`

export { Entrada }
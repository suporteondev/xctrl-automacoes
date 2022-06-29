import styled from 'styled-components'

const Entrada = styled.input`
    height: 40px;
    width: 100%;
    border-top: 0.5px solid ${props => props.theme.linhas};
    border-bottom: 0.5px solid ${props => props.theme.linhas};
    border-left: none;
    border-right: none;
    background-color: ${props => props.theme.fundos};
    color: ${props => props.theme.textos};
    font-family: 'Poppins', sans-serif;
    padding: 0 10px;
`

export { Entrada }
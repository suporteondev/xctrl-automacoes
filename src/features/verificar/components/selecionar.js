import styled from 'styled-components'

const Selecionar = styled.select`
    height: 45px;
    width: 100%;
    border: 0.5px solid ${props => props.theme.linhas};
    background-color: ${props => props.theme.fundos};
    color: ${props => props.theme.textos};
    border-radius: 4px;
    font-family: 'Poppins', sans-serif;
    padding: 0 10px;
`

export { Selecionar }
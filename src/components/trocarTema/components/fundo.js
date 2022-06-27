import styled from 'styled-components'

const Fundo = styled.div`
    width: 50px;
    height: 26px;
    border-radius: 20px;
    background-color: ${props => props.theme.linhas};
    display: flex;
    align-items: center;
    justify-content: ${props => props.alinhamento};
    padding: 0 2px;
    cursor: pointer;
    -webkit-app-region: no-drag;
`

export { Fundo }
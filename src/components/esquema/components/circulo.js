import styled from 'styled-components'

const Circulo = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: ${props => props.corFundo};
    color: ${props => props.theme.fundos};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
    cursor: pointer;
    -webkit-app-region: no-drag;
`

export { Circulo }
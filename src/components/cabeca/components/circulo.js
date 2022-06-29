import styled from 'styled-components'

const Circulo = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 100%;
    border: 1px solid ${props => props.theme.linhas};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
    cursor: pointer;
    -webkit-app-region: no-drag;

    img{
        width: 14px;
        margin: 0 auto;
    }
`

export { Circulo }
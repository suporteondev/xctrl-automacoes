import styled from 'styled-components'

const CaixaRodape = styled.div`
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    border-top: 1px solid ${props => props.theme.linhas};
    -webkit-app-region: drag;
    filter: ${props => props.blur == true ? 'blur(3px)' : 'blur(0)'};
`

export { CaixaRodape }
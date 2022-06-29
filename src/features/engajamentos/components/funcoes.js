import styled from 'styled-components'

const Funcoes = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    display: ${props => props.display == true ? 'flex' : 'none' };
    align-items: center;
    justify-content: center;
    left: 0;
    top: 0;
    z-index: 100;
    color: #fff;
`

export { Funcoes }
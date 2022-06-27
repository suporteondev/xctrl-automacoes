import styled from 'styled-components'

const Cabeca = styled.div`
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 20px;
    height: 50px;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme.linhas};
    background-color: ${props => props.theme.fundos};
    transition: padding 0.3s ease-in-out;
    -webkit-app-region: drag;

    @media(max-width: 600px){
        padding: 0 20px;
    }

    img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
`

export { Cabeca }
import styled from 'styled-components'

const Rodape = styled.div`
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    border-top: 1px solid ${props => props.theme.linhas};
    transition: padding ease-in-out 0.3s;

    @media(max-width: 600px){
        padding: 0 20px;
    }
`

export { Rodape }
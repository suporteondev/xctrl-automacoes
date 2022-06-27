import styled from 'styled-components'

const Conteudos = styled.div`
    width: 100%;
    height: calc(100% - 100px);
    position: fixed;
    top: 50px;
    bottom: 50px;
    overflow-y: auto;
    padding: 0 20px;

    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    ::-webkit-scrollbar-track {
        background: ${props => props.theme.fundos};
    }

    ::-webkit-scrollbar-thumb {
        background-color:  ${props => props.theme.linhas};
        border-radius: 20px;
    }
`

export { Conteudos }
import styled from 'styled-components'

const AreaTexto = styled.textarea`
    height: 130px;
    width: 100%;
    border: 0.5px solid ${props => props.theme.linhas};
    background-color: ${props => props.theme.fundos};
    color: ${props => props.theme.textos};
    border-radius: 4px;
    font-family: 'Poppins', sans-serif;
    padding: 10px;
    resize: none;

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

export { AreaTexto }
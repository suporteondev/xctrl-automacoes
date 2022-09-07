import styled from 'styled-components'

const Textarea = styled.textarea`
    height: 120px;
    width: 100%;
    border: 0.5px solid ${props => props.theme.linhas};
    background-color: ${props => props.theme.fundos};
    color: ${props => props.theme.descricoes};
    border-radius: 4px;
    font-family: 'Poppins', sans-serif;
    padding: 10px;
    font-size: 12px;
    resize: none;

    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-track {
        background: ${props => props.theme.fundos};
    }

    ::-webkit-scrollbar-thumb {
        background-color:  ${props => props.theme.linhas};
    }
`

export { Textarea }
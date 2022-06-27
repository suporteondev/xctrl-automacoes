import styled from 'styled-components'

const Cartas = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    padding: 20px 0px;

    .salvar{
        width: 50px; 
        height: 40px; 
        background-color: ${props => props.theme.fundoTabela}; 
        display: flex; 
        align-items: center; 
        justify-content: center;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border-top: 0.5px solid ${props => props.theme.linhas};
        border-bottom: 0.5px solid ${props => props.theme.linhas};
        border-right: 0.5px solid ${props => props.theme.linhas};
        cursor: pointer;
    }

    .informacoes{
        width: 50px; 
        height: 40px; 
        background-color: ${props => props.theme.fundoTabela}; 
        display: flex; 
        align-items: center; 
        justify-content: center;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border-top: 0.5px solid ${props => props.theme.linhas};
        border-bottom: 0.5px solid ${props => props.theme.linhas};
        border-left: 0.5px solid ${props => props.theme.linhas};
        cursor: default;
        border-left: 0.5px solid ${props => props.theme.linhas};
        position: relative;

        p{
            position: absolute;
            visibility: hidden;
            width: 250px;
            top: 40px;
            left: 0;
            font-size: 12px;
            font-weight: 400;
            visibility: hidden;
            background-color: ${props => props.theme.linhaTabela};
            color: ${props => props.theme.textos};
            padding: 10px;
            border-radius: 10px;
            z-index: 100;
        }
    }

    .informacoes:hover p{
        visibility: visible;
    }
`

export { Cartas }
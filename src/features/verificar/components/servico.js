import styled from 'styled-components'

const Servico = styled.div`
    min-width: 35px;
    padding: 0 10px;
    height: 35px;
    background-color: ${props => props.theme.linhaTabela};
    color: ${props => props.fundoCor};
    margin-right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    border-radius: 5px;
    cursor: ${props => props.cursor ? props.cursor : 'no-drop'};
    position: relative;

    .descricao {
        visibility: hidden;
        background-color: ${props => props.theme.fundoTabela};
        color: ${props => props.fundoCor};
        text-align: center;
        padding: 5px 10px;
        font-size: 12px;
        font-weight: 400;
        border-radius: 6px;
        white-space: nowrap;
        position: absolute;
        bottom: 40px;
        left: 0;
        box-shadow: 0 0 1em ${props => props.theme.fundoTabela};
        z-index: 1;
    }

    :hover .descricao {
        visibility: visible;
    }
`

export { Servico }
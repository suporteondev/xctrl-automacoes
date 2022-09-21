import styled from 'styled-components'

const Opcao = styled.div`
    min-width: 40px;
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: 1px solid ${props => props.cor ? props.cor : props.theme.linhas};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    position: relative;
    cursor: ${props => props.cursor ? props.cursor : 'pointer'};
    background-color: ${props => props.cor ? props.cor : props.theme.linhas};
    svg{
        font-size: 20px;
        color: ${props => props.status};
    }

    span{
        visibility: hidden;
        background-color: ${props => props.cor ? props.cor : props.theme.linhas};
        color: ${props => props.theme.textos};
        padding: 5px 10px;
        font-size: 12px;
        font-weight: 500;
        border-radius: 6px;
        position: absolute;
        bottom: ${props => props.bottom == 'direita' ? '7px' : '-35px'};
        left: ${props => props.left == 'direita' ? '55px' : '0'};
        z-index: 1;
        white-space: nowrap;
    }

    :hover span{
        visibility: visible;
    }
`

export { Opcao }
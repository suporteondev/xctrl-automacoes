import styled from 'styled-components'

const Opcao = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: ${props => props.cor ? props.cor : props.theme.linhas};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    position: relative;
    cursor: ${props => props.cursor ? props.cursor : 'pointer'};

    span{
        visibility: hidden;
        background-color: ${props => props.cor ? props.cor : props.theme.linhas};
        color: ${props => props.corTexto ? props.corTexto : '#fff'};
        padding: 5px 10px;
        font-size: 12px;
        font-weight: 500;
        border-radius: 6px;
        position: absolute;
        bottom: ${props => props.bottom == 'direita' ? '7px' : '45px'};
        left: ${props => props.left == 'direita' ? '45px' : '0'};
        z-index: 1;
        white-space: nowrap;
    }

    :hover span{
        visibility: visible;
    }

    img{
        width: 16px;
    }
`

export { Opcao }
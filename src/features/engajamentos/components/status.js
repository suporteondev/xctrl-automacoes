import styled from 'styled-components'

const Status = styled.div`
    background-color: ${props => props.cor};
    color: #fff;
    font-weight: 500;
    font-size: 12px;
    width: 40px;
    height: 40px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    justify-content: center;
    position: relative;

    .descricao {
        visibility: hidden;
        background-color: ${props => props.cor};
        color: #FFF;
        text-align: center;
        padding: 5px 10px;
        font-size: 12px;
        border-radius: 6px;
        white-space: nowrap;
        position: absolute;
        left: 45px;
        box-shadow: 0 0 1em ${props => props.theme.fundoTabela};
        z-index: 1;
    }

    :hover .descricao {
        visibility: visible;
    }

    img{
        width: 16px;
        height: 16px;
    }

    img.menor{
        width: 14px;
        height: 14px;
    }
`

export { Status }
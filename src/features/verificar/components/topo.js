import styled from 'styled-components'

const Topo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    p{
        width: 30px;
        height: 30px;
        font-weight: 500;
        font-size: 18px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${props => props.theme.fundoTabela};
        color: #236EFF;
        position: relative;

        .descricao {
            width: 250px;
            visibility: hidden;
            background-color: ${props => props.theme.fundoTabela};
            color: ${props => props.fundoCor};
            text-align: center;
            padding: 5px 10px;
            font-size: 12px;
            font-weight: 400;
            border-radius: 6px;
            position: absolute;
            top: 35px;
            right: 0;
            box-shadow: 0 0 1em ${props => props.theme.fundoTabela};
            z-index: 1;
        }

        :hover .descricao {
            visibility: visible;
        }
    }
`

export { Topo }
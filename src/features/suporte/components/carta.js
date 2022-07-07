import styled from 'styled-components'

const Carta = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid ${props => props.theme.linhas};
    padding: 10px;
    border-radius: 10px;
    position: relative;
    width: calc(50% - 5px);
    margin-bottom: 10px;

    div{
        width: 100%;
        height: 120px;
        background-color: ${props => props.theme.fundoTabela};
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;

        img{
            width: 60px;
        }

        span{
            position: absolute;
            top: 15px;
            right: 15px;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background-color: ${props => props.theme.linhaTabela};
            display: flex;
            font-weight: 600;
            align-items: center;
            justify-content: center;
            cursor: default;

            p{
                width: 200px;
                position: absolute;
                top: 30px;
                right: -100px;
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

        span:hover p{
            visibility: visible;
        }
    }

    button{
        height: 40px;
        width: 100%;
        background-color: #05A660;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${props => props.theme.fundos};
        border-radius: 4px;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        cursor: pointer;
        font-size: 12px;
        margin-top: 10px;
    }
`

export { Carta }
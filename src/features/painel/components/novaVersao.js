import styled from 'styled-components'

const NovaVersao = styled.div`
    display: flex;
    flex-direction: column;
    width: 310px;
    padding: 15px;
    position: fixed;
    bottom: 60px;
    right: 20px;
    background-color: ${props => props.theme.linhas};

    h1{
        font-size: 16px;
    }

    p{
        font-size: 14px;
        margin-top: 5px;
    }

    a{
        width: 100%;
        height: 45px;
        margin-top: 10px;
        background-color: red;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;
    }
`

export { NovaVersao }
import styled from 'styled-components'

const Logs = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: calc(100vh - 120px);
    transition: padding 0.3s ease-in-out;
    padding: 20px 0;
    margin: -15px 0;

    h1{
        font-size: 16px;
        font-weight: 600;
        color: #0A84FF;
    }

    p{
        font-size: 12px;
        color: ${props => props.theme.textos};
    }

    button{
        height: 40px;
        width: 100%;
        background-color: orange;
        border: none;
        color: #fff;
        border-radius: 4px;
        font-family: 'Poppins', sans-serif;
        cursor: pointer;
        margin-top: 10px;
    }
`

export { Logs }
import styled from 'styled-components'

const Fundo = styled.div`
    min-width: 40px;
    height: 40px;
    padding: 0 10px;
    border-radius: 8px;
    margin-right: 5px;
    border: 1px solid ${props => props.cor ? props.cor : props.theme.linhas};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    -webkit-app-region: no-drag;
    position: relative;
    color: ${props =>  props.cor ? props.cor : props.theme.textos};

    input{
        border: none;
        width: 100%;
        height: 40px;
        background-color: unset;
        color: ${props => props.theme.textos};
        font-family: 'Poppins', sans-serif;
    }

    input.vps{
        border: none;
        width: 20px;
        height: 40px;
        background-color: unset;
        color: ${props => props.theme.textos};
        font-family: 'Poppins', sans-serif;
    }

    span{
        visibility: hidden;
        position: absolute;
        bottom: 45px;
        left: 0;
        background-color: ${props => props.theme.linhas};
        font-size: 12px;
        font-weight: 400;
        padding: 5px 10px;
        border-radius: 5px;
        white-space: nowrap;
        color: ${props => props.cor ? props.cor : props.theme.textos};
    }

    svg{
        font-size: 22px;
    }

    :hover{
        background-color: ${props => props.theme.linhas};

        span{
            visibility: visible;
        }
    }
`

export { Fundo }
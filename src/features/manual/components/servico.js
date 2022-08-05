import styled from 'styled-components'

const Servico = styled.div`
    height: 120px;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.linhas};
    padding: 15px 10px 10px 10px;

    :hover{
        background-color: ${props => props.theme.linhas};
        transition: 300ms ease-in-out;
        cursor: pointer;
    }

    div{
        width: 35px;
        height: 35px;
        background-color: ${props => props.ativo == true ? '#0A84FF' : props.theme.linhas};
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        img{
            width: 18px;
        }
    }

    h1{
        font-size: 16px;
        color: ${props => props.theme.textos};
        margin-top: 5px;
        font-weight: 500;
    }

    p{
        font-size: 14px;
        color: ${props => props.theme.descricoes};
    }
`

export { Servico }
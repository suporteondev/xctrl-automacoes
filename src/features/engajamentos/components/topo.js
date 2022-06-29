import styled from 'styled-components'

const Topo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;

    h1{
        font-size: 20px;
        font-weight: 600;
    }

    div{
        display: flex;
        align-items: center;
        justify-content: center;

        input{
            height: 40px;
            width: 100%;
            border: 0.5px solid ${props => props.theme.linhas};
            background-color: ${props => props.theme.fundos};
            color: ${props => props.theme.textos};
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            font-family: 'Poppins', sans-serif;
            padding: 0 10px;
        }

        div{
            width: 50px;
            height: 40px;
            background-color: #236EFF;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            cursor: pointer;

            img{
                width: 20px;
                height: 20px;
            }
        }
    }
`

export { Topo }
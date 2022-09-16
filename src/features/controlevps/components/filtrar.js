import styled from 'styled-components'

const Filtrar = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    display: ${props => props.display == true ? 'flex' : 'none' };
    align-items: center;
    justify-content: center;
    left: 0;
    top: 0;
    z-index: 100;
    color: #fff;

    .form{
        width: 300px;
        display: flex;
        flex-direction: column;
        background-color: ${props => props.theme.fundos};
        padding: 20px;
        box-shadow: 0 0 1em ${props => props.theme.linhas};
        border-radius: 10px;

        h1{
            font-size: 20px;
            text-align: left;
        }

        label{
            font-size: 14px;
            font-weight: 600;
            color: ${props => props.theme.textos};
            margin-top: 5px;
            margin-bottom: 5px;
            text-align: left;
        }

        input{
            height: 45px;
            max-width: 45px;
            border: 0.5px solid ${props => props.theme.linhas};
            background-color: ${props => props.theme.fundos};
            color: ${props => props.theme.textos};
            border-radius: 4px;
            font-family: 'Poppins', sans-serif;
            padding: 0 10px;
        }

        select{
            height: 45px;
            width: 100%;
            border: 0.5px solid ${props => props.theme.linhas};
            background-color: ${props => props.theme.fundos};
            color: ${props => props.theme.textos};
            border-radius: 4px;
            font-family: 'Poppins', sans-serif;
            padding: 0 10px;
        }

        textarea{
            height: 120px;
            width: 100%;
            border: 0.5px solid ${props => props.theme.linhas};
            background-color: ${props => props.theme.fundos};
            color: ${props => props.theme.textos};
            border-radius: 4px;
            font-family: 'Poppins', sans-serif;
            padding: 10px;
            resize: none;

            ::-webkit-scrollbar {
                width: 5px;
                height: 5px;
            }

            ::-webkit-scrollbar-track {
                background: ${props => props.theme.fundos};
            }

            ::-webkit-scrollbar-thumb {
                background-color:  ${props => props.theme.linhas};
                border-radius: 20px;
            }
        }

        div{
            display: flex;
            align-items: center;
            margin-top: 5px;
            
            button{
                height: 45px;
                width: 100%;
                border: none;
                margin-left: 3px;
                margin-right: 3px;
                color: ${props => props.theme.textos};
                font-family: 'Poppins', sans-serif;
                cursor: pointer;
                background-color: ${props => props.theme.linhas};
            }
        }
    }
`

export { Filtrar }
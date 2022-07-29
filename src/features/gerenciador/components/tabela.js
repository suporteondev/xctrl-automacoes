import styled from 'styled-components'

const Tabela = styled.div`
    width: 100%;
    min-height: calc(100vh - 140px);
    max-height: calc(100vh - 140px);
    overflow-y: auto;

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

    table{
        width: 100%;
        border-collapse: collapse;

        thead{
            height: 55px;
            color: ${props => props.theme.textos};
            font-size: 12px;
            text-align: center;
            background-color: ${props => props.theme.linhaTabela};
            white-space: nowrap;
            tr{
                height: 56px;
                td{
                    border-bottom: 1px solid ${props => props.theme.linhaTabela};
                    font-size: 12px;
                    text-align: center;
                    position: relative;

                    img{
                        cursor: pointer;
                        
                    }

                    span{
                        visibility: hidden;
                        background-color: ${props => props.cor ? props.cor : props.theme.linhas};
                        color: ${props => props.theme.textos};
                        font-size: 12px;
                        font-weight: 500;
                        border-radius: 6px;
                        position: absolute;
                        top: 40px;
                        left: 30px;
                        z-index: 1;
                        white-space: nowrap;
                    }

                    :hover span{
                        visibility: visible;
                    }
                    
                }
                td:nth-child(1){
                    border-top-left-radius: 10px;
                }
                td:nth-child(7){
                    border-top-right-radius: 10px;
                }
            }
        }

        tbody{

            tr{
                height: 56px;

                td{
                    border-bottom: 1px solid ${props => props.theme.linhas};
                    font-size: 12px;
                    padding: 0 15px;
                    text-align: center;
                    background-color: ${props => props.theme.caixas};

                    input{
                        width: auto;
                        margin: 0 auto;
                        text-align: center;
                        background-color: initial;
                        border: none;
                        max-width: 100px;
                        color: ${props => props.theme.textos};
                        font-family: 'Poppins', sans-serif;
                        font-size: 12px;
                    }
                }
            }
        }
    }
`

export { Tabela }
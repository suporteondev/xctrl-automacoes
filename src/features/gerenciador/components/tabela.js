import styled from 'styled-components'

const Tabela = styled.div`
    width: 100%;
    max-height: calc(100vh - 190px);
    padding-right: 5px;
    overflow-y: auto;
    margin-top: 10px;

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
            text-align: center;
            background-color: ${props => props.theme.linhaTabela};
            tr{
                height: 56px;
                td{
                    border-bottom: 1px solid ${props => props.theme.linhaTabela};
                    font-size: 12px;
                    padding: 0 15px;
                    text-align: center;
                }
            }
        }

        tbody{
            tr{
                height: 56px;
                td{
                    border-bottom: 1px solid ${props => props.theme.linhaTabela};
                    font-size: 12px;
                    padding: 0 15px;
                    text-align: center;
                    background-color: ${props => props.theme.linhas};
                }
            }
        }
    }
`

export { Tabela }
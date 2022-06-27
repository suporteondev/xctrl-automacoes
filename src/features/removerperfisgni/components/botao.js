import styled from 'styled-components'

const Botao = styled.button`
    height: 45px;
    width: calc(50% - 5px);
    background-color: ${props => props.cor == 'verde' ? '#05A660' : '#236EFF'};
    border: none;
    color: #fff;
    border-radius: 4px;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
`

export { Botao }
import styled from 'styled-components'

const Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    font-size: 14px;
    margin-top: 5px;

    p{
        color: ${props => props.theme.textos};
        text-decoration: underline;
        cursor: pointer;
    }
`

export { Div }
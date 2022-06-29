import styled from 'styled-components'

const Conteudos = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: calc(100vh - 100px);
    transition: padding 0.3s ease-in-out;
    padding: 20px 0;
    filter: ${props => props.blur == true ? 'blur(3px)' : 'blur(0)'};
`

export { Conteudos }
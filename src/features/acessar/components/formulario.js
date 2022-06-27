import styled from 'styled-components'

const Formulario = styled.form`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    width: 300px;
    transition: width 0.3s ease-in-out;

    @media(max-width: 450px){
        width: 100%;
    }
`

export { Formulario }
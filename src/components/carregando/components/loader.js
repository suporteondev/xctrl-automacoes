import styled from 'styled-components'

const Loader = styled.div`
    border: 3px solid ${props => props.theme.linhas};
    border-top: 3px solid orange;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`

export { Loader }
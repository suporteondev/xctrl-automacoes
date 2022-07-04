import { createGlobalStyle } from 'styled-components';
 
const EstiloGlobal = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        list-style-type: none;
        list-style: none;
        text-decoration: none;
        box-sizing: border-box;
        box-shadow: 0 0 0 0;
        outline: 0;
    }

    body{
        font-family: 'Poppins', sans-serif;
        background-color: ${props => props.theme.fundos};
        color: ${props => props.theme.textos};
    }
`;

export { EstiloGlobal }
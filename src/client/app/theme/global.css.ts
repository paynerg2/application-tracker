import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: ${(props) => props.theme.font.primary}, sans-serif;
        font-size: 16px;
        color: ${(props) => props.theme.color.desaturatedGray};
    }

    button {
        border: none;
        font-family : inherit;
        font-size: 1em;
    }

    a, a:visited, a:hover, a:active {
    text-decoration: none;

    ul {
        /* Remove default list styles */
        list-style-type: none;
        margin: 0;
        padding-left: 0;
    }
    li {
        list-style-type: none;
    }
}
`;

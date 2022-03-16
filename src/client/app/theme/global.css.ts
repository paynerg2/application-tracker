import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
    }
    body {
        margin: 0;
        padding: 0;
        font-family: ${(props) => props.theme.font.primary}, sans-serif;
        font-size: 16px;
        color: ${(props) => props.theme.color.mainText};
        background: ${(props) => props.theme.color.background};
    }

    h1,h2,h3,h4,h5,h6, p {
        color: ${(props) => props.theme.color.mainText};
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

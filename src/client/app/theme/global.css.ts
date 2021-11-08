import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        color: ${(props) => props.theme.color.desaturatedGray};
    }

    a, a:visited, a:hover, a:active {
    text-decoration: none;
}
`;

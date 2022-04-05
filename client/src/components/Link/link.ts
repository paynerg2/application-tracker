import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const Link = styled(RouterLink)`
    color: ${(props) => props.theme.color.link};
    text-decoration: none;
    font-weight: 500;
    display: block;
`;

export default Link;

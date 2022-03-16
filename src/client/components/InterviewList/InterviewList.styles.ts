import styled from 'styled-components';
import Button from '../../components/Button/button';
import { List } from '../List/list';

export const CircularButton = styled(Button)`
    border-radius: 50%;
    height: 1.25em;
    width: 1.25em;
    font-size: 4em;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        display: none;
    }
`;

export const ListContainer = styled(List)`
    height: auto;
    gap: 2vmin;

    > ${CircularButton} {
        align-self: flex-end;
        margin-right: 2.5%;
        margin-top: 2.5%;
    }

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        border-radius: 0;
    }
`;

import styled from 'styled-components';
import Button from '../../components/Button/button';
import { Layout as FormLayout } from '../../components/Form/form';

export const Container = styled.div`
    width: 80vw;
    height: 100%;
    margin: 0 auto;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        padding-bottom: 5em;
        box-sizing: border-box;
    }
`;

export const Actions = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    ${Button} {
        width: 50%;
    }
`;

export const Layout = styled(FormLayout)`
    align-items: flex-start;

    @media (min-width: ${(props) => props.theme.breakpoint.mobile}) {
        align-items: flex-start;
    }
`;

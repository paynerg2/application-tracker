import styled from 'styled-components';
import Button from '../../components/Button/button';

export const Container = styled.div`
    width: 80vw;
    min-height: 90vh;
    height: 100%;
    margin: 0 auto;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        padding-bottom: 5em;
        box-sizing: border-box;
        width: 100vw;
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

export const Layout = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 4em;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 0;
    }
`;

export const OptionsSection = styled.section`
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 2em;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.color.surface};
    border-radius: ${(props) => props.theme.borders.radius};

    > h4 {
        margin: 0;
    }

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 5em;
        border-radius: 0;
    }
`;

export const UserInfo = styled.section`
    display: flex;
    flex-direction: column;
    gap: 5em;
`;

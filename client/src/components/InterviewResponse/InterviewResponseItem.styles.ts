import styled from 'styled-components';
import { ResponseButton } from './InterviewResponseTable.styles';

export const Container = styled.div`
    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        min-width: 18em;
        width: 90%;
        height: 18em;
        background-color: ${(props) => props.theme.color.background};
        border-radius: ${(props) => props.theme.borders.radius};
        margin-bottom: 1em;
    }
`;

export const Details = styled.div`
    font-weight: 500;
    height: 6em;
    display: grid;
    grid-template-columns: 5em 1fr;
    border-bottom: 2px solid ${(props) => props.theme.color.separator};
    margin-bottom: 0.4em;
    background-color: ${(props) => props.theme.color.background};
    color: ${(props) => props.theme.color.mainText};

    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

export const Responses = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    padding: 1em;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.color.secondarySurface};
`;

export const ResponseRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

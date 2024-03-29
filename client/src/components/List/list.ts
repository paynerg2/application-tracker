import styled from 'styled-components';

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    min-height: 20vmin;
    height: fit-content;
    width: 100%;
    background: linear-gradient(
        to right,
        ${(props) => props.theme.color.primary} 10%,
        ${(props) => props.theme.color.surface} 10%,
        ${(props) => props.theme.color.surface} 100%
    );
    list-style: none;

    border-radius: ${(props) => props.theme.borders.radius};

    gap: 2vmin;
    padding: 2vmin 0;
    box-sizing: border-box;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        border-radius: 0;
        width: 100%;
    }
`;

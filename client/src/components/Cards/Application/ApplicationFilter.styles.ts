import styled from 'styled-components';

export const Layout = styled.div`
    min-height: 40vh;
    height: fit-content;
    width: 90%;

    grid-column: 1 /3;
    grid-row: 2;

    display: flex;
    flex-direction: column;

    justify-content: flex-start;
    align-items: flex-start;

    gap: 2vmin;
    padding: 2vmin;
    box-sizing: border-box;

    background: ${(props) => props.theme.color.surface};
    border-radius: ${(props) => props.theme.borders.radius};

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        display: none;
    }
`;

export const CheckboxGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    width: 100%;
`;

export const CountDisplay = styled.div`
    height: fit-content;
    width: 2vw;
    border-radius: ${(props) => props.theme.borders.radius};
    background: ${(props) => props.theme.color.background};
    color: ${(props) => props.theme.color.lightGray};
    padding: 0.2vmin;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SearchBox = styled.input`
    display: flex;
    flex-direction: row;
    height: 6vh;
    width: 20vw;
    background: ${(props) => props.theme.color.background};
    border: 2px solid ${(props) => props.theme.color.lightGray};
    border-radius: ${(props) => props.theme.borders.radius};
    font-family: ${(props) => props.theme.font.primary};
    font-size: 1.25em;
    color: ${(props) => props.theme.color.mainText};

    padding: 1vmin;
    box-sizing: border-box;

    ::placeholder {
        color: ${(props) => props.theme.color.mainText};
    }
`;

export const FilterSection = styled.h3`
    position: relative;
    width: 100%;
    font-family: ${(props) => props.theme.font.primary};
    font-weight: 700;
    font-size: 1.5em;
    color: ${(props) => props.theme.color.mainText};
    margin: 0;

    &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        height: 0.2em;
        width: 100%;
        background-color: ${(props) => props.theme.color.backgroundStripe};
        border-radius: ${(props) => props.theme.borders.radius};
    }
`;

export const HorizontalLine = styled.div`
    height: 0.2em;
    width: 100%;
    background-color: ${(props) => props.theme.color.backgroundStripe};
    border-radius: ${(props) => props.theme.borders.radius};
`;

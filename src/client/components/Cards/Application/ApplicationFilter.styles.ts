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

    background: ${(props) => props.theme.color.lightBlue};
    border-radius: ${(props) => props.theme.borders.radius};
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
    background: ${(props) => props.theme.color.white};
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
    background: ${(props) => props.theme.color.white};
    border: 2px solid ${(props) => props.theme.color.lightGray};
    border-radius: ${(props) => props.theme.borders.radius};
    font-family: ${(props) => props.theme.font.primary};
    font-size: 1.25em;
    color: ${(props) => props.theme.color.darkGray};

    padding: 1vmin;
    box-sizing: border-box;

    ::placeholder {
        color: ${(props) => props.theme.color.lightGray};
    }
`;

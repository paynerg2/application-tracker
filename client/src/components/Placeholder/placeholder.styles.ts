import styled from 'styled-components';

export const Placeholder = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    font-size: 1.5em;
    font-weight: 500;
    width: 80%;
    background-color: ${(props) => props.theme.color.surface};
    border-radius: ${(props) => props.theme.borders.radius};

    grid-column: 1 / 7;
    grid-row: 2 / 3;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        display: flex;
        flex-direction: column;
        padding: 0;
        margin: 0;
        border-radius: 0;
    }
`;

export const Image = styled.img`
    width: 30%;
    height: 60%;
    opacity: 45%;
    position: relative;
    padding: 1em;
    box-sizing: border-box;

    border-bottom: 2px double ${(props) => props.theme.color.primary};

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 70%;
    }
`;

export const Header = styled.h4`
    margin: 0;
    color: ${(props) => props.theme.color.primary};
    opacity: 45%;
    text-align: center;
`;

export const Cta = styled.p`
    font-size: 0.5em;
    opacity: 45%;
    text-align: center;
`;

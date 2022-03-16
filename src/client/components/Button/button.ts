import styled from 'styled-components';

const Button = styled.button<{ inverted?: boolean }>`
    width: 100%;
    padding: 1rem;
    text-align: center;
    font-weight: 700;
    font-size: 1rem;
    border-radius: ${(props) => props.theme.borders.radius};
    border: 1px solid ${(props) => props.theme.color.primary};
    background-color: ${(props) =>
        props.inverted ? props.theme.color.buttonInverted : props.theme.color.button};
    color: ${(props) =>
        props.inverted ? props.theme.color.button : props.theme.color.buttonInverted};
    cursor: pointer;
    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 3vmin;

    &:disabled {
        background-color: ${(props) => props.theme.color.lightGray};
        border-color: ${(props) => props.theme.color.lightGray};
        opacity: 0.5;
        cursor: not-allowed;
    }

    @media (${(props) => props.theme.breakpoint.mobile}) {
        max-width: 50vw;
    }
`;

export default Button;

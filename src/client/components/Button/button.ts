import styled from 'styled-components';

const Button = styled.button<{ inverted?: boolean }>`
    width: 100%;
    padding: 1rem;
    text-align: center;
    font-weight: 700;
    font-size: 1rem;
    border-radius: ${(props) => props.theme.borders.radius};
    border: 1px solid ${(props) => props.theme.color.primaryBlue};
    background-color: ${(props) =>
        props.inverted ? props.theme.color.white : props.theme.color.primaryBlue};
    color: ${(props) => (props.inverted ? props.theme.color.primaryBlue : props.theme.color.white)};
    cursor: pointer;
    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 3vmin;

    @media (${(props) => props.theme.breakpoint.mobile}) {
        max-width: 50vw;
    }
`;

export default Button;

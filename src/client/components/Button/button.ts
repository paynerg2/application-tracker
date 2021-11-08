import styled from 'styled-components';

const Button = styled.button`
    //width: 100%;
    height: 4rem;
    padding: 1rem;
    text-align: center;
    font-weight: 700;
    font-size: 1.625rem;
    border-radius: ${(props) => props.theme.borders.radius};
    background-color: ${(props) => props.theme.color.primaryBlue};
    color: ${(props) => props.theme.color.white};
    cursor: pointer;
    box-sizing: border-box;

    @media (${(props) => props.theme.breakpoint.mobile}) {
        max-width: 50vw;
    }
`;

export default Button;

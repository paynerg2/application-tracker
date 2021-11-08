import styled from 'styled-components';

/**
 * Form Components
 */

export const FormHeader = styled.h2`
    font-family: ${(props) => props.theme.font.secondary};
    font-size: 2rem;
    font-weight: 700;
    color: ${(props) => props.theme.color.desaturatedGray};
    margin: 0;
`;

export const Label = styled.label`
    font-size: 1rem;
    font-weight: 600;
    margin-top: 2vh;
    margin-bottom: 0.5vh;
`;

export const Input = styled.input`
    text-align: left;
    font-size: 1rem;
    border-radius: ${(props) => props.theme.borders.radius};
    border: solid 1px rgba(0, 0, 0, 0.15);
    color: ${(props) => props.theme.color.desaturatedGray};
    padding: 1rem;
    box-sizing: border-box;

    &:focus,
    :active {
        outline: none !important;
        box-shadow: 0 0 2px ${(props) => props.theme.color.primaryBlue};
    }
`;

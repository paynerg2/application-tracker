import styled from 'styled-components';

/**
 * Form Components
 */

export const FormHeader = styled.h2`
    font-family: ${(props) => props.theme.font.secondary};
    font-size: 2rem;
    font-weight: 700;
    text-transform: uppercase;
    color: ${(props) => props.theme.color.desaturatedGray};
    margin: 0;
`;

export const Error = styled.div`
    height: 1.6rem;
    line-height: 1.6rem;
    font-family: 0.8rem;
    text-align: right;
    color: ${(props) => props.theme.color.error};
    margin: 0.1vh 0;
`;

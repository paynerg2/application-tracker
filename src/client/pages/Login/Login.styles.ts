import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

/**
 * Structural Elements
 */

export const Layout = styled.div`
    display: flex;
    min-height: 100vh;

    @media (min-width: 600px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

export const Container = styled.div`
    height: auto;
    width: 62vw;
    min-width: 630px;
    max-width: 1200px;
    background-color: ${(props) => props.theme.color.white};
    border-radius: ${(props) => props.theme.borders.radius};
    box-shadow: ${(props) => props.theme.borders.shadow};

    @media (min-width: 600px) {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }
`;

export const Form = styled.form`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Section = styled.section`
    width: 43%;
    margin: 5vh 0;
`;
export const FormSection = styled(Section)`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 4vh;
`;

export const ImageSection = styled(Section)``;

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
`;

export const Image = styled.img`
    height: 100%;
    width: 100%;
`;

export const Link = styled(RouterLink)`
    color: ${(props) => props.theme.color.link};
    text-decoration: none;
    font-weight: 500;
`;

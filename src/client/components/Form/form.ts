import styled from 'styled-components';

/**
 * Form Components
 */

export const FormHeader = styled.h2`
    font-family: ${(props) => props.theme.font.secondary};
    font-size: 2rem;
    font-weight: 700;
    text-transform: uppercase;
    color: ${(props) => props.theme.color.mainText};
    margin: 0;
`;

export const Error = styled.div`
    height: 1.6rem;
    line-height: 1.6rem;
    font-family: 0.8rem;
    text-align: right;
    color: ${(props) => props.theme.color.error};
    margin: 0.1vh 0;
    white-space: nowrap;
`;

export const Image = styled.img`
    height: 100%;
    width: 100%;
`;

/**
 * Structural Elements
 */
export const Layout = styled.div`
    display: flex;
    min-height: 90vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (min-width: ${(props) => props.theme.breakpoint.mobile}) {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
`;

export const Container = styled.div`
    background-color: ${(props) => props.theme.color.secondarySurface};
    border-radius: ${(props) => props.theme.borders.radius};
    box-shadow: ${(props) => props.theme.borders.shadow};

    min-height: 50em;
    width: 62vw;
    min-width: 700px;
    max-width: 1200px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 100vw;
        height: 100vh;
        min-width: 400px;
        box-sizing: border-box;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        justify-self: center;
    }
`;

const Section = styled.section`
    @media (min-width: ${(props) => props.theme.breakpoint.mobile}) {
        width: 50%;
    }
`;

export const FormSection = styled(Section)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 5vmin;
    padding: 5vmax 5vmax;
    box-sizing: border-box;
`;

export const ImageSection = styled(Section)`
    display: none;
    background-color: ${(props) => props.theme.color.secondary};
    padding: 0;
    box-sizing: border-box;

    @media (min-width: ${(props) => props.theme.breakpoint.mobile}) {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-items: flex-end;
        padding: 0;
    }
`;

export const ButtonSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 1vmin;
`;

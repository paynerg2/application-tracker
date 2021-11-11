import styled from 'styled-components';

/**
 * Structural Elements
 */

export const Layout = styled.div`
    display: flex;
    min-height: 90vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (min-width: 600px) {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
`;

export const Container = styled.div`
    height: auto;
    width: 100vw;
    //max-width: 100%;
    box-sizing: border-box;

    background-color: ${(props) => props.theme.color.white};
    border-radius: ${(props) => props.theme.borders.radius};
    box-shadow: ${(props) => props.theme.borders.shadow};

    @media (min-width: 600px) {
        width: 62vw;
        min-width: 630px;
        max-width: 1200px;
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
    margin: 5vh 0;

    @media (min-width: ${(props) => props.theme.breakpoint.mobile}) {
        width: 37%;
    }
`;
export const FormSection = styled(Section)`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 5vh;
    margin: 5vmin;
`;
export const ImageSection = styled(Section)`
    display: none;

    @media (min-width: ${(props) => props.theme.breakpoint.mobile}) {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-items: flex-end;
    }
`;

export const Image = styled.img`
    height: 100%;
    width: 100%;
`;

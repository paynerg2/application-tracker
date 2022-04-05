import styled from 'styled-components';

export const Layout = styled.footer`
    height: 80vh;
    min-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.color.footer};

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        display: none;
    }
`;

export const FooterContainer = styled.div`
    color: ${(props) => props.theme.color.contrastText};

    section {
        width: auto;
        display: flex;
        flex-direction: column;
        column-gap: 5vh;
    }

    h2 {
        font-size: 2.7rem;
        font-weight: 400;
        color: ${(props) => props.theme.color.contrastText};
    }

    p {
        color: ${(props) => props.theme.color.contrastText};
    }

    a {
        color: rgba(255, 255, 255, 0.69);
        font-weight: 700;
    }

    @media (min-width: ${(props) => props.theme.breakpoint.mobile}) {
        width: 80vw;

        section {
            width: 33%;
            display: flex;
            flex-direction: column;
            column-gap: 5vh;
        }
    }
`;

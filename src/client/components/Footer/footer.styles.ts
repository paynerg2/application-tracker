import styled from 'styled-components';

export const Layout = styled.footer`
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.color.darkGray};
`;

export const FooterContainer = styled.div`
    width: 80vw;
    color: rgba(255, 255, 255, 0.69);

    section {
        width: 30%;
        display: flex;
        flex-direction: column;
        column-gap: 5vh;
    }

    h2 {
        font-size: 2.7rem;
        font-weight: 400;
    }

    a {
        color: rgba(255, 255, 255, 0.69);
        font-weight: 700;
    }
`;

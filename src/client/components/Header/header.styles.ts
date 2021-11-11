import styled from 'styled-components';

export const Layout = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 10vh;
    background-color: ${(props) => props.theme.color.white};
`;

export const HeaderContainer = styled.div`
    width: 80vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

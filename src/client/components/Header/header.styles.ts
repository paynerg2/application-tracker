import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Layout = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 10vh;
    background-color: ${(props) => props.theme.color.white};
    margin-bottom: 2vh;
`;

export const HeaderContainer = styled.div`
    width: 80vw;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const NavLink = styled(Link)`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: ${(props) => props.theme.font.secondary};
    font-weight: 700;
    color: ${(props) => props.theme.color.lightGray};
`;

export const SelectedNavLink = styled(NavLink)`
    border-bottom: solid 3px ${(props) => props.theme.color.primaryBlue};
    color: ${(props) => props.theme.color.primaryBlue};
`;

export const NavLinkSection = styled.nav`
    height: 100%;
    display: flex;
    flex-direction: row;
    gap: 5vw;
`;

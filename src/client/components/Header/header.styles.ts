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

const itemHeight = '3rem';
export const DropdownItem = styled.li`
    width: 100%;
    height: ${itemHeight};
    line-height: ${itemHeight};
    background: ${(props) => props.theme.color.veryLightGray};
    display: block;
    position: relative;
    transition-duration: 0.5s;
    border-bottom: 1px solid ${(props) => props.theme.color.veryLightGray};
    text-align: center;

    &:hover {
        background: ${(props) => props.theme.color.primaryBlue};
        color: ${(props) => props.theme.color.white};
        cursor: pointer;
    }
`;

const menuItemGap = '1em';
export const DropdownMenu = styled.ul`
    display: none;
    flex-direction: column;
    justify-content: center;

    visibility: hidden;
    opacity: 0;
    min-width: 10rem;
    height: fit-content;
    margin: 0;
    padding-left: 0;

    position: absolute;
    top: 7vh;
    transition: all 0.5s ease;
    cursor: pointer;
`;

export const IconSection = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1vw;

    &:hover > ${DropdownMenu}, &:focus-within > ${DropdownMenu}, &:focus > ${DropdownMenu} {
        visibility: visible;
        opacity: 1;
        display: flex;
    }
`;

export const Greeting = styled.div`
    width: min-content;
    // Trick to force one word per line
    word-spacing: 999999px;
`;

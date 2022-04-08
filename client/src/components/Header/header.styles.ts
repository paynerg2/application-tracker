import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Layout = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 10vh;
    background-color: ${(props) => props.theme.color.background};
    margin-bottom: 2vh;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 100vw;
        margin-bottom: 0;
        position: fixed;
        bottom: 0;
        z-index: 100;
        background-color: ${(props) => props.theme.color.footer};
    }
`;

export const HeaderContainer = styled.div`
    width: 80vw;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 100%;
        padding-left: 10vw;
        box-sizing: border-box;
    }
`;

export const NavLink = styled.button`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: ${(props) => props.theme.font.secondary};
    font-weight: 700;
    color: ${(props) => props.theme.color.lightGray};
    background-color: ${(props) => props.theme.color.background};
    cursor: pointer;
`;

export const SelectedNavLink = styled(NavLink)`
    border-bottom: solid 3px ${(props) => props.theme.color.primary};
    color: ${(props) => props.theme.color.primary};
`;

export const NavLinkSection = styled.nav`
    height: 100%;
    display: flex;
    flex-direction: row;
    gap: 5vw;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        display: none;
    }
`;

const itemHeight = '3em';
export const DropdownItem = styled.li`
    width: 100%;
    height: ${itemHeight};
    line-height: ${itemHeight};
    background: ${(props) => props.theme.color.surface};
    display: block;
    transition-duration: 0.2s;
    border-radius: ${(props) => props.theme.borders.radius};
    text-align: center;
    z-index: 1;

    &:hover {
        color: ${(props) => props.theme.color.primary};
        font-weight: 700;
        cursor: pointer;
    }

    &:last-child {
        border-bottom: none;
    }
`;

export const DropdownMenu = styled(motion.ul)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 10em;
    height: 6em;
    margin: 0;
    padding-left: 0;
    background-color: ${(props) => props.theme.color.surface};
    border-radius: ${(props) => props.theme.borders.radius};

    position: absolute;
    top: 10vh;
    cursor: pointer;

    // Dialog arrow
    &:before {
        content: '';
        position: absolute;
        width: 2em;
        height: 2em;
        top: -1.2em;
        left: 5.5em;
        background-color: ${(props) => props.theme.color.surface};
        transform: rotate(45deg);
    }
`;

export const IconSection = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1vw;
    height: 100%;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        display: none;
    }
`;

export const Greeting = styled.div`
    width: min-content;
    color: ${(props) => props.theme.color.mainText};
    // Trick to force one word per line
    word-spacing: 999999px;
`;

export const MobileMenuButton = styled(motion.div)`
    display: none;
    height: 0;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        max-height: 30em;
        width: 30%;
        background: ${(props) => props.theme.color.button};
        color: ${(props) => props.theme.color.buttonInverted};
        cursor: pointer;
    }
`;

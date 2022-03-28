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

const itemHeight = '3rem';
export const DropdownItem = styled.li`
    width: 100%;
    height: ${itemHeight};
    line-height: ${itemHeight};
    background: ${(props) => props.theme.color.secondarySurface};
    display: block;
    position: relative;
    transition-duration: 0.5s;
    border-bottom: 1px solid ${(props) => props.theme.color.separator};
    text-align: center;

    &:hover {
        background: ${(props) => props.theme.color.primary};
        color: ${(props) => props.theme.color.buttonInverted};
        cursor: pointer;
    }

    &:last-child {
        border-bottom: none;
    }
`;

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

export const MobileMenuButton = styled.div`
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

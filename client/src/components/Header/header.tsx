import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useAppDispatch } from '../../app/hooks';
import { useAppSelector } from '../../app/hooks';
import { api, tags } from '../../services/api';
import { defaultState } from '../../state/authSlice';
import { isEmpty } from '../../_helpers/objectHelpers';
import {
    DropdownItem,
    DropdownMenu,
    Greeting,
    HeaderContainer,
    IconSection,
    Layout,
    NavLink,
    NavLinkSection,
    SelectedNavLink,
    MobileMenuButton,
} from './header.styles';
import ProfileImage from '../ProfileImage/profileImage';
import Logo from '../../assets/Logo.svg';
import DarkLogo from '../../assets/Dark_Logo.svg';
import useWindowDimensions from '../../_helpers/useWindowDimensions';
import { pixelStringToNumber } from '../../_helpers/stringHelpers';
import MobileMenu from '../MobileMenu/mobileMenu';

function Header() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);
    const { width } = useWindowDimensions();
    const theme = useTheme();

    const pathName = location.pathname.split('/')[1];
    const routes = ['applications', 'interviews', 'stats'];

    /*-------- Display -------------*/

    const getRouteNav = () => {
        return routes.map((route) =>
            route === pathName.toLocaleLowerCase() ? (
                <SelectedNavLink key={route} onClick={() => handleNavigate(route)}>
                    {route.toLocaleUpperCase()}
                </SelectedNavLink>
            ) : (
                <NavLink key={route} onClick={() => handleNavigate(route)}>
                    {route.toLocaleUpperCase()}
                </NavLink>
            )
        );
    };

    const getLogo = (): string => {
        const breakpoint = pixelStringToNumber(theme.breakpoint.laptop);
        if (width && width <= breakpoint) {
            return DarkLogo;
        }
        return user.settings?.isDarkMode ? DarkLogo : Logo;
    };

    /*-------- Callbacks -------------*/

    const handleNavigate = (next: string) => {
        navigate(`/${next}`);
    };

    const handleLogout = async () => {
        dispatch(defaultState());
        dispatch(api.util.invalidateTags(tags));
        navigate('/');
    };

    return (
        <Layout>
            <HeaderContainer>
                <img
                    onClick={() => navigate(!isEmpty(user) ? '/applications' : '/')}
                    src={getLogo()}
                    alt="Trackr Logo"
                />
                <NavLinkSection>{!isEmpty(user) && getRouteNav()}</NavLinkSection>
                {!isEmpty(user) && (
                    <>
                        <IconSection
                            aria-haspopup="true"
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setTimeout(() => setShowDropdown(false), 2000)}
                        >
                            {user.fullName && (
                                <Greeting>
                                    Hello, <strong>{user.fullName.split(' ')[0]}</strong>
                                </Greeting>
                            )}
                            <ProfileImage name={user.fullName || ''} />
                            {showDropdown && (
                                <DropdownMenu
                                    aria-label="submenu"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: '1.5em' }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <DropdownItem onClick={() => navigate('/me')}>
                                        Edit Profile
                                    </DropdownItem>
                                    <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                                </DropdownMenu>
                            )}
                        </IconSection>
                        <MobileMenuButton onClick={() => setShowMobileMenu((prev) => !prev)}>
                            {showMobileMenu ? 'X' : 'Menu'}
                        </MobileMenuButton>
                    </>
                )}
            </HeaderContainer>
            <MobileMenu show={showMobileMenu} setShow={setShowMobileMenu} onLogout={handleLogout} />
        </Layout>
    );
}

export default Header;

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../app/hooks';
import { api, tags } from '../../services/api';
import { defaultState } from '../../state/authSlice';
import { isEmpty } from '../../_helpers/objectHelpers';
import { useAppSelector } from '../../app/hooks';
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
import { theme } from '../../app/theme/theme';
import { pixelStringToNumber } from '../../_helpers/pixelStringToNumber';
import MobileMenu from '../MobileMenu/mobileMenu';

function Header() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);
    const { width } = useWindowDimensions();

    const routes = ['applications', 'interviews', 'stats'];
    const getRouteNav = () => {
        const pathName = location.pathname.split('/')[1];
        return routes.map((route) =>
            route === pathName.toLocaleLowerCase() ? (
                <SelectedNavLink key={route} to={`/${route}`}>
                    {route.toLocaleUpperCase()}
                </SelectedNavLink>
            ) : (
                <NavLink key={route} to={`/${route}`}>
                    {route.toLocaleUpperCase()}
                </NavLink>
            )
        );
    };

    const handleLogout = async () => {
        dispatch(defaultState());
        dispatch(api.util.invalidateTags(tags));
        navigate('/');
    };

    const getLogo = (): string => {
        const breakpoint = pixelStringToNumber(theme.breakpoint.laptop);
        if (width && width <= breakpoint) {
            return DarkLogo;
        }
        return user.settings.isDarkMode ? DarkLogo : Logo;
    };

    return (
        <Layout>
            <HeaderContainer>
                <Link to="/">
                    <img src={getLogo()} alt="Trackr Logo" />
                </Link>
                <NavLinkSection>{!isEmpty(user) && getRouteNav()}</NavLinkSection>
                {!isEmpty(user) && (
                    <>
                        <IconSection aria-haspopup="true">
                            {user.fullName && (
                                <Greeting>
                                    Hello, <strong>{user.fullName.split(' ')[0]}</strong>
                                </Greeting>
                            )}
                            <ProfileImage name={user.fullName || ''} />
                            <DropdownMenu aria-label="submenu">
                                <DropdownItem onClick={() => navigate('/me')}>
                                    Edit Profile
                                </DropdownItem>
                                <DropdownItem>Settings</DropdownItem>
                                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                            </DropdownMenu>
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

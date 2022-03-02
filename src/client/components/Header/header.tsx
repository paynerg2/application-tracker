import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Logo from '../../assets/Logo.svg';
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
} from './header.styles';
import ProfileImage from '../ProfileImage/profileImage';
import { useAuth } from '../../hooks/useAuth';

function Header() {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

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

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Layout>
            <HeaderContainer>
                <Link to="/">
                    <img src={Logo} alt="Trackr Logo" />
                </Link>
                <NavLinkSection>{user && getRouteNav()}</NavLinkSection>
                {user && (
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
                )}
            </HeaderContainer>
        </Layout>
    );
}

export default Header;

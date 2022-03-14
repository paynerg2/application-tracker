import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../app/hooks';
import { api, tags } from '../../services/api';
import { defaultState } from '../../state/authSlice';
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
} from './header.styles';
import ProfileImage from '../ProfileImage/profileImage';
import Logo from '../../assets/Logo.svg';

function Header() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);

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

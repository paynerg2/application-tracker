import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Logo from '../../assets/Logo.svg';
import { HeaderContainer, Layout, NavLink, NavLinkSection, SelectedNavLink } from './header.styles';

function Header() {
    // TODO: Get user state for user icon/logout, etc.
    const [user, setUser] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        const user = window.localStorage.getItem('user');
        if (user) {
            setUser(user);
        }
    }, []);

    const routes = ['applications', 'interviews', 'stats'];
    const getRouteNav = () => {
        const pathName = location.pathname.split('/')[1];
        return routes.map((route) =>
            route === pathName.toLocaleLowerCase() ? (
                <SelectedNavLink key={route} to={`/${route}`}>
                    {route.toLocaleUpperCase()}
                </SelectedNavLink>
            ) : (
                <NavLink key={route} to={`${route}`}>
                    {route.toLocaleUpperCase()}
                </NavLink>
            )
        );
    };

    return (
        <Layout>
            <HeaderContainer>
                <Link to="/">
                    <img src={Logo} alt="Trackr Logo" />
                </Link>
                <NavLinkSection>{user && getRouteNav()}</NavLinkSection>
                {user && <div>Logged in as {JSON.parse(user).email!}</div>}
            </HeaderContainer>
        </Layout>
    );
}

export default Header;

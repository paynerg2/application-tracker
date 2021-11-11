import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Logo from '../../assets/Logo.svg';
import { HeaderContainer, Layout } from './header.styles';

function Header() {
    // TODO: Get user state for user icon/logout, etc.
    // TODO: Get current url path to show active section in nav.
    // TODO: Conditionally show nav if user is logged in.
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const user = window.localStorage.getItem('user');
        if (user) {
            setUser(user);
        }
    }, []);

    return (
        <Layout>
            <HeaderContainer>
                <a href="/">
                    <img src={Logo} alt="Trackr Logo" />
                </a>
                {user && <div>Logged in as {JSON.parse(user).email!}</div>}
            </HeaderContainer>
        </Layout>
    );
}

export default Header;

import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import Logo from '../../assets/Dark_Logo.svg';
import Button from '../Button/button';
import { FooterContainer, Layout } from './footer.styles';

function Footer() {
    const history = useHistory();
    return (
        <Layout>
            <FooterContainer>
                <section>
                    <a href="/">
                        <img src={Logo} alt="Trackr Logo" />
                    </a>
                    <h2>
                        Ready to
                        <br />
                        <span style={{ fontSize: '3rem', fontWeight: 700 }}>Get Started?</span>
                    </h2>
                    <Button onClick={() => history.push('/signup')} style={{ fontSize: '1.5rem' }}>
                        Create an Account
                    </Button>
                </section>
                <br />
                <p>
                    Copyright &copy; 2020 Trackr. All Rights Reserved.{''}
                    <a href="#"> Privacy Policy</a> <a href="#">Terms of Use</a>
                </p>
            </FooterContainer>
        </Layout>
    );
}

export default Footer;

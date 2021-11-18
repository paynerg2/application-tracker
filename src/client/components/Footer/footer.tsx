import React from 'react';
import { useHistory } from 'react-router';

import Logo from '../../assets/Dark_Logo.svg';
import Button from '../Button/button';
import { FooterContainer, Layout } from './footer.styles';
import Link from '../Link/link';

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
                    <Button
                        onClick={() => history.push('/signup')}
                        style={{ fontSize: '1.5rem', minWidth: '300px' }}
                    >
                        Create an Account
                    </Button>
                </section>
                <br />
                <p>
                    Copyright &copy; 2020 Trackr. All Rights Reserved.{''}
                    <Link to="#"> Privacy Policy</Link> <Link to="#">Terms of Use</Link>
                </p>
            </FooterContainer>
        </Layout>
    );
}

export default Footer;

import React from 'react';
import { useNavigate } from 'react-router';

import LogoImage from '../../assets/Dark_Logo.svg';
import Button from '../Button/button';
import { FooterContainer, FooterSections, Layout, Logo, SiteNav } from './footer.styles';
import Link from '../Link/link';
import { useAppSelector } from '../../app/hooks';
import { isEmpty } from '../../_helpers/objectHelpers';
import TextButton from '../TextButton/textButton';
import { capitalizeFirstLetter } from '../../_helpers/capitalize';
import GithubIcon from '../../assets/icons8-github.svg';
import LinkedInIcon from '../../assets/icons8-linkedin.svg';
import GmailIcon from '../../assets/icons8-gmail.svg';

function Footer() {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);

    const getNavLinks = () => {
        const routes = ['appliations', 'interviews', 'stats'];
        return routes.map((route) => (
            <li key={route}>
                <TextButton onClick={() => navigate(`/${route}`)}>
                    {capitalizeFirstLetter(route)}
                </TextButton>
            </li>
        ));
    };

    return (
        <Layout>
            <FooterContainer>
                <Logo
                    onClick={() => (isEmpty(user) ? '/' : '/applications')}
                    src={LogoImage}
                    alt="Trackr Logo"
                    style={{ cursor: 'pointer' }}
                />
                <FooterSections>
                    {isEmpty(user) && (
                        <section id="cta">
                            <h2>
                                Ready to
                                <br />
                                <span style={{ fontSize: '3rem', fontWeight: 700 }}>
                                    Get Started?
                                </span>
                            </h2>
                            <Button
                                onClick={() => navigate('/signup')}
                                style={{ fontSize: '1.5rem', minWidth: '300px' }}
                            >
                                Create an Account
                            </Button>
                            <p style={{ textAlign: 'center' }}>
                                Already a user?{' '}
                                <TextButton onClick={() => navigate('/login')}>Log In</TextButton>
                            </p>
                        </section>
                    )}
                    {!isEmpty(user) && (
                        <SiteNav>
                            <h3>Navigation</h3>
                            <ul>
                                {getNavLinks()}
                                <li>
                                    <TextButton onClick={() => navigate('/me')}>
                                        User Profile
                                    </TextButton>
                                </li>
                            </ul>
                        </SiteNav>
                    )}
                    <section>
                        <h3>Contact</h3>
                        <p>If you'd like to help make my own job hunt shorter, contact me!</p>
                        <a href="mailto:paynerg2@gmail.com">
                            <img
                                style={{ width: '1.2em', height: '1.2em', verticalAlign: 'middle' }}
                                src={GmailIcon}
                                alt="Email"
                            />{' '}
                            <span>paynerg2@gmail.com</span>
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer noopener"
                            href="https://www.github.com/paynerg2"
                        >
                            <img
                                style={{ width: '1.2em', height: '1.2em', verticalAlign: 'middle' }}
                                src={GithubIcon}
                                alt="Github"
                            />{' '}
                            <span>paynerg2</span>
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer noopener"
                            href="https://www.linkedin.com/in/paynerg2"
                        >
                            <img
                                style={{ width: '1.2em', height: '1.2em', verticalAlign: 'middle' }}
                                src={LinkedInIcon}
                                alt="LinkedIn"
                            />{' '}
                            <span>paynerg2</span>
                        </a>
                    </section>
                    <section>
                        <h3>Credit</h3>
                        <p>
                            Special thanks to{' '}
                            <a target="_blank" rel="noreferrer noopener" href="https://undraw.co/">
                                Undraw
                            </a>{' '}
                            for all of the images used on the site. Check out their selection of
                            free-to-use images.
                        </p>
                        <p>
                            All icons courtesy of{' '}
                            <a target="_blank" rel="noreferrer noopener" href="https://icons8.com/">
                                Icons8
                            </a>
                            .
                        </p>
                    </section>
                </FooterSections>
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

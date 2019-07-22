import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { userActions } from '../../_actions';

const DesktopHeader = styled.div`
    @media (max-width: 760px) {
        display: none;
    }
`;

const MobileHeader = styled.div`
    @media (min-width: 760px) {
        display: none;
    }
`;

const HeaderContainer = styled.div`
    width: 100%;
    height: 11vh;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: 'Open Sans', sans-serif;
    font-size: 1.4em;
`;

const MobileHeaderContainer = styled.div`
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-family: 'Open Sans', sans-serif;
    font-size: 1.4em;
`;

const Brand = styled(Link)`
    color: #1995ad;
    font-family: 'Istok Web', sans-serif;
    font-size: 3em;
    font-weight: bold;
    letter-spacing: 2px;
    padding-left: 29px;
    margin-right: 20px;
    border: none;
    text-decoration: none;

    &:active,
    &:visited,
    &:link,
    &:focus {
        text-decoration: none;
    }

    &:hover {
        text-decoration: none;
        color: #a1d6e2;
    }
`;

const Nav = styled.div`
    text-decoration: none;
    margin-right: 10px;
    padding: 6px;
    color: #1995ad;
`;

const MobileNavLinkContainer = styled.div`
    overflow: hidden;
    height: auto;
    max-height: ${props => (props.isExpanded ? '1000px' : '0')};
    transition: max-height 0.5s ease-out;
`;
MobileNavLinkContainer.displayName = 'MobileNavLinkContainer';

const NavigationLink = styled(NavLink)`
    margin: 5px;
    padding: 6px;
    color: #1995ad;

    &:focus,
    &:active,
    &:visited,
    &:hover {
        text-decoration: none;
        color: #1995ad;
    }

    &.is-active {
        text-decoration: none;
        color: white;
        background-color: #1995ad;

        @media (min-width: 760px) {
            color: #1995ad;
            background-color: white;
            border-bottom: solid 3px #1995ad;
        }
    }
`;
NavigationLink.displayName = 'NavigationLink';

const MobileNavLink = styled(NavigationLink)`
    padding-left: 29px;
`;

const NavButton = styled.button`
    text-decoration: none;
    border: 1px solid #1995ad;
    border-radius: 20px;
    color: #1995ad;
    border: none;
    background-color: transparent;
`;

const MenuIcon = styled.div`
    align-self: flex-end;
    margin-right: 20px;
    color: #666;
    height: 45px;
    padding: 5px;
    font-style: bold;
    border-radius: 6px;
    border: 1px solid #f1f1f2;
    transition: all 0.5s ease-in;

    &:hover {
        background-color: #1995ad;
        color: white;
    }
`;

const HeaderLeft = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const HeaderRight = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false
        };

        this.logout = this.logout.bind(this);
    }

    onNavMenuClick() {
        this.setState({ isExpanded: !this.state.isExpanded });
    }

    logout() {
        const { dispatch } = this.props;
        dispatch(userActions.logout());
    }

    render() {
        const { user } = this.props;
        const { isExpanded } = this.state;
        return (
            <React.Fragment>
                <DesktopHeader>
                    <HeaderContainer>
                        <HeaderLeft>
                            <Brand to="/">trackr</Brand>
                            <NavigationLink
                                exact
                                to="/"
                                activeClassName="is-active"
                            >
                                Applications
                            </NavigationLink>
                            <NavigationLink
                                exact
                                to="/interviews"
                                activeClassName="is-active"
                            >
                                Interviews
                            </NavigationLink>
                            <NavigationLink
                                exact
                                to="/data"
                                activeClassName="is-active"
                            >
                                Data
                            </NavigationLink>
                            <NavigationLink
                                to="/applications"
                                activeClassName="is-active"
                            >
                                Add New
                            </NavigationLink>
                        </HeaderLeft>
                        <HeaderRight>
                            {user ? (
                                <React.Fragment>
                                    <Nav>{user.username}</Nav>
                                    <Nav>
                                        <NavButton onClick={this.logout}>
                                            Logout
                                        </NavButton>
                                    </Nav>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <NavigationLink to="/login">
                                        Login
                                    </NavigationLink>
                                    <NavigationLink to="/register">
                                        Sign up
                                    </NavigationLink>
                                </React.Fragment>
                            )}
                        </HeaderRight>
                    </HeaderContainer>
                </DesktopHeader>
                <MobileHeader>
                    <MobileHeaderContainer>
                        <HeaderContainer>
                            <Brand to="/">trackr</Brand>
                            {user && (
                                <MenuIcon onClick={() => this.onNavMenuClick()}>
                                    Menu
                                </MenuIcon>
                            )}
                        </HeaderContainer>
                        <MobileNavLinkContainer isExpanded={isExpanded}>
                            <MobileHeaderContainer>
                                <MobileNavLink
                                    exact
                                    to="/"
                                    activeClassName="is-active"
                                    onClick={() => this.onNavMenuClick()}
                                >
                                    Applications
                                </MobileNavLink>
                                <MobileNavLink
                                    exact
                                    to="/interviews"
                                    activeClassName="is-active"
                                    onClick={() => this.onNavMenuClick()}
                                >
                                    Interviews
                                </MobileNavLink>
                                <MobileNavLink
                                    exact
                                    to="/data"
                                    activeClassName="is-active"
                                    onClick={() => this.onNavMenuClick()}
                                >
                                    Data
                                </MobileNavLink>
                                <MobileNavLink
                                    to="/applications"
                                    activeClassName="is-active"
                                    onClick={() => this.onNavMenuClick()}
                                >
                                    Add New
                                </MobileNavLink>
                                <MobileNavLink
                                    to="#"
                                    activeClassName="is-active"
                                    onClick={() => {
                                        this.onNavMenuClick();
                                        this.logout();
                                    }}
                                >
                                    Logout
                                </MobileNavLink>
                            </MobileHeaderContainer>
                        </MobileNavLinkContainer>
                    </MobileHeaderContainer>
                </MobileHeader>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const user = state.authentication.user;
    return {
        user
    };
}

Header.propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

const connectedHeader = connect(mapStateToProps)(Header);
export { connectedHeader as Header };

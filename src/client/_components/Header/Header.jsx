import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { userActions } from '../../_actions';

const HeaderContainer = styled.div`
    width: 100%;
    height: 8vh;
    background-color: #bcbabe;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Brand = styled(Link)`
    color: #1995ad;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
    font-weight: bold;
    padding-left: 29px;
    margin-right: 20px;
    border: none;

    &:hover {
        text-decoration: none;
        color: #a1d6e2;
    }
`;

const Nav = styled.div`
    text-decoration: none;
    margin-right: 10px;
    border: 1px solid #1995ad;
    border-radius: 20px;
    padding: 6px;
    color: #1995ad;

    &:hover {
        border: 1px solid #bcbabe;
        color: #bcbabe;
        background-color: #1995ad;
    }
`;

const NavLink = styled(Link)`
    text-decoration: none;
    margin-right: 10px;
    border: 1px solid #1995ad;
    border-radius: 20px;
    padding: 6px;
    transition: background-color 0.3s ease;
    transition: color 0.3s ease;

    &:focus,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
        color: #1995ad;
    }
    &:hover {
        color: #bcbabe;
        background: #1995ad;
    }
`;

const NavButton = styled.button`
    text-decoration: none;
    border: 1px solid #1995ad;
    border-radius: 20px;
    color: #1995ad;
    border: none;
    background-color: transparent;

    &:hover {
        color: #bcbabe;
        background: #1995ad;
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

        this.logout = this.logout.bind(this);
    }
    logout() {
        const { dispatch } = this.props;
        dispatch(userActions.logout());
    }

    render() {
        const { user } = this.props;
        return (
            <HeaderContainer>
                <HeaderLeft>
                    <Brand to="/">Application Tracker</Brand>
                    <NavLink to="/interviews">Interviews</NavLink>
                    <NavLink to="/data">Data</NavLink>
                    <NavLink to="/applications">Add New</NavLink>
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
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/register">Sign up</NavLink>
                        </React.Fragment>
                    )}
                </HeaderRight>
            </HeaderContainer>
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

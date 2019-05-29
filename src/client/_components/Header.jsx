import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.div`
    width: 100%;
    height: 8vh;
    background-color: #bebebe;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Brand = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
    font-weight: bold;
    padding-left: 29px;
`;

const NavLink = styled(Link)`
    text-decoration: none;
    color: black;
    margin-right: 10px;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
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
        console.log(user);
        return (
            <HeaderContainer>
                <HeaderLeft>
                    <Brand>
                        <NavLink to="/">Application Tracker</NavLink>
                    </Brand>
                    <NavLink to="/interviews">Interviews</NavLink>
                    <NavLink to="/data">Data</NavLink>
                    <NavLink to="/applications/">Add New</NavLink>
                </HeaderLeft>
                <HeaderRight>
                    {!user && (
                        <React.Fragment>
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/register">Sign up</NavLink>
                        </React.Fragment>
                    )}
                    {user && (
                        <React.Fragment>
                            <div>Logged in as {user.username}</div>
                            <button onClick={this.logout}>Logout</button>
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

const connectedHeader = connect(mapStateToProps)(Header);
export { connectedHeader as Header };

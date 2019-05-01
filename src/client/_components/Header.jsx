import React, { Component } from 'react';
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

export class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <HeaderContainer>
                <HeaderLeft>
                    <Brand>
                        <NavLink to="/">Application Tracker</NavLink>
                    </Brand>
                    <NavLink to="/data">Data</NavLink>
                    <NavLink to="#">Add New</NavLink>
                </HeaderLeft>
                <HeaderRight>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Sign up</NavLink>
                </HeaderRight>
            </HeaderContainer>
        );
    }
}

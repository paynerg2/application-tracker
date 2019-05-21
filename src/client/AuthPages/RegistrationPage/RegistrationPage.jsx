import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';
import {
    FormContainer,
    H2Text,
    FormGroup,
    Input,
    HelpBlock,
    Button
} from '../form';

class RegistrationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            location: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, location } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            // dispatch create user action
            dispatch(
                userActions.create({
                    username,
                    password,
                    location
                })
            );
        }
    }

    render() {
        const { username, password, location, submitted } = this.state;
        return (
            <FormContainer>
                <H2Text>Create a New Account</H2Text>
                <form
                    name="form"
                    onSubmit={this.handleSubmit}
                    autoComplete="off"
                >
                    <FormGroup>
                        <label htmlFor="username">Username</label>
                        <Input
                            type="text"
                            name="username"
                            value={username}
                            onChange={this.handleChange}
                        />
                        {submitted && !username && (
                            <HelpBlock>Username is required</HelpBlock>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="password">Password</label>
                        <Input
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                        />
                        {submitted && !password && (
                            <HelpBlock>Password is required</HelpBlock>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="location">Location</label>
                        <Input
                            type="text"
                            name="location"
                            value={location}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button>Register</Button>
                    </FormGroup>
                </form>
            </FormContainer>
        );
    }
}

const connectedRegistrationPage = connect(null)(RegistrationPage);
export { connectedRegistrationPage as RegistrationPage };
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

import { userActions } from '../../_actions';
import {
    FormContainer,
    H2Text,
    FormGroup,
    Column,
    Input,
    HelpBlock,
    Button
} from '../form';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        // reset status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
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
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <FormContainer
                name="form"
                onSubmit={this.handleSubmit}
                autoComplete="off"
            >
                <Column>
                    <H2Text>Login</H2Text>
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
                        {loggingIn ? (
                            <Loader
                                type="ThreeDots"
                                color="#1995ad"
                                height="50"
                                width="50"
                            />
                        ) : (
                            <Button>Login</Button>
                        )}
                    </FormGroup>
                </Column>
            </FormContainer>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

LoginPage.propTypes = {
    loggingIn: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
};

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };

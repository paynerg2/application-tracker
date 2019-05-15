import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute, Header } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../AuthPages/LoginPage';
import { RegistrationPage } from '../AuthPages/RegistrationPage';
import { DataPage } from '../DataPage';
import { CreateApplicationPage } from '../ApplicationPages/CreateApplicationPage';
import { CreateInterviewPage } from '../InterviewPages/CreateInterviewPage/CreateInterviewPage';

class App extends Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div>
                <div>
                    {alert.message && (
                        <div className={`alert ${alert.type}`}>
                            {alert.message}
                        </div>
                    )}
                    <Router history={history}>
                        <div>
                            <Route path="/" component={Header} />
                            <PrivateRoute path="/" exact component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route
                                path="/register"
                                component={RegistrationPage}
                            />
                            <PrivateRoute path="/data" component={DataPage} />
                            <PrivateRoute
                                exact
                                path="/applications/"
                                component={CreateApplicationPage}
                            />
                            <PrivateRoute
                                path="/applications/:applicationId"
                                component={CreateApplicationPage}
                            />
                            <PrivateRoute
                                exact
                                path="/interviews/"
                                component={CreateInterviewPage}
                            />
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}
const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };

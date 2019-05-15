import React, { Component } from 'react';
import { connect } from 'react-redux';
import { applicationActions } from '../_actions';
import { CardList, Container } from './homepage.styles';
import { ApplicationCard } from '../_components';

class HomePage extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(applicationActions.getAll());
    }

    render() {
        const { applicationList, loading } = this.props;
        return (
            <React.Fragment>
                <Container>
                    {loading && <div>Loading...</div>}
                    {!loading && (
                        <CardList>
                            {applicationList.map(app => {
                                return (
                                    <ApplicationCard
                                        key={app.id}
                                        application={app}
                                    />
                                );
                            })}
                        </CardList>
                    )}
                </Container>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { applicationList, loading } = state.applications;
    // sort by submission date, ascending
    applicationList.sort((a, b) => {
        const dateA = new Date(a.dateApplicationSent);
        const dateB = new Date(b.dateApplicationSent);
        return dateA - dateB;
    });
    return {
        applicationList,
        loading
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };

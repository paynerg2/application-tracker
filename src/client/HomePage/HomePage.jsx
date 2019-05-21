import React, { Component } from 'react';
import { connect } from 'react-redux';
import { applicationActions, interviewActions } from '../_actions';
import { CardList, Container } from './homepage.styles';
import { ApplicationCard } from '../_components';

class HomePage extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(applicationActions.getAll());
        dispatch(interviewActions.getAll());
    }

    render() {
        const { applicationList, interviewList, loading } = this.props;
        return (
            <React.Fragment>
                <Container>
                    {loading && <div>Loading...</div>}
                    {!loading && (
                        <CardList>
                            {applicationList.map(app => {
                                let interviews = [];
                                console.log('this.props on Homepage');
                                console.log(this.props);
                                const { interviewList } = this.props;
                                if (interviewList && interviewList.length > 0) {
                                    console.log(
                                        'interviewList from the CardList render on HomePage'
                                    );
                                    console.log(interviewList);
                                    interviews = interviewList.filter(
                                        interview =>
                                            interview.applicationId === app.id
                                    );
                                }
                                return (
                                    <ApplicationCard
                                        key={app.id}
                                        application={app}
                                        interviews={interviews}
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
    const { interviewList } = state.interviews;
    // sort by submission date, ascending
    applicationList.sort((a, b) => {
        const dateA = new Date(a.dateApplicationSent);
        const dateB = new Date(b.dateApplicationSent);
        return dateA - dateB;
    });
    return {
        applicationList,
        interviewList,
        loading
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };

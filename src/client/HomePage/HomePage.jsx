import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { applicationActions, interviewActions } from '../_actions';
import { CardList, Container } from './homepage.styles';
import { ApplicationCard } from '../_components/ApplicationCard';

class HomePage extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(applicationActions.getAll());
        dispatch(interviewActions.getAll());
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
                                let interviews = [];
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
                                        history={this.props.history}
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

HomePage.propTypes = {
    applicationList: PropTypes.arrayOf(PropTypes.object),
    interviewList: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
};

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };

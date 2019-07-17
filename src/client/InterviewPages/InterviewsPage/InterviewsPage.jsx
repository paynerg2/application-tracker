import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

import { interviewActions, applicationActions } from '../../_actions';
import { CardList, Container } from '../../HomePage/homepage.styles';
import { InterviewCard } from '../../_components/InterviewCard';

class InterviewsPage extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(interviewActions.getAll());
        dispatch(applicationActions.getAll());
    }

    render() {
        const { interviewList, loading, applicationList } = this.props;
        return (
            <React.Fragment>
                <Container>
                    {loading && (
                        <div>
                            <Loader
                                type="ThreeDots"
                                color="#1995ad"
                                height="50"
                                width="50"
                            />
                        </div>
                    )}
                    {!loading && (
                        <CardList>
                            {interviewList.map(interview => {
                                const { company } = applicationList.filter(
                                    app => app.id === interview.applicationId
                                )[0];
                                return (
                                    <InterviewCard
                                        key={interview.id}
                                        company={company}
                                        interview={interview}
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
    const { interviewList, loading } = state.interviews;
    const { applicationList } = state.applications;
    return {
        interviewList,
        loading: loading || state.applications.loading,
        applicationList
    };
}

InterviewsPage.propTypes = {
    interviewList: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
};

const connectedInterviewsPage = connect(mapStateToProps)(InterviewsPage);
export { connectedInterviewsPage as InterviewsPage };

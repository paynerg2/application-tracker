import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { interviewActions } from '../../_actions';
import { CardList, Container } from '../../HomePage/homepage.styles';
import { InterviewCard } from '../../_components';

class InterviewsPage extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(interviewActions.getAll());
    }

    render() {
        const { interviewList, loading } = this.props;
        return (
            <React.Fragment>
                <Container>
                    {loading && <div>Loading...</div>}
                    {!loading && (
                        <CardList>
                            {interviewList.map(interview => {
                                return (
                                    <InterviewCard
                                        key={interview.id}
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
    return {
        interviewList,
        loading
    };
}

InterviewsPage.propTypes = {
    interviewList: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
};

const connectedInterviewsPage = connect(mapStateToProps)(InterviewsPage);
export { connectedInterviewsPage as InterviewsPage };

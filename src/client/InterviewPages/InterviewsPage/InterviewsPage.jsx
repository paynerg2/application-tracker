import React, { Component } from 'react';
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
        console.log('interviewlist from interviewspage render');
        console.log(interviewList);
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

const connectedInterviewsPage = connect(mapStateToProps)(InterviewsPage);
export { connectedInterviewsPage as InterviewsPage };

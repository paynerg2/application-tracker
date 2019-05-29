import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const InterviewContainer = styled.select`
    width: 88%;
`;

class InterviewList extends Component {
    // TODO: add function to format date/time

    renderList = () => {
        const { loading, interviews } = this.props;
        return (
            <InterviewContainer>
                {!loading &&
                    interviews.map(interview => {
                        const { _id, startTime, location } = interview;
                        return (
                            <option key={_id}>
                                {`${startTime}, ${location}`}
                            </option>
                        );
                    })}
            </InterviewContainer>
        );
    };

    render() {
        return <React.Fragment>{this.renderList()}</React.Fragment>;
    }
}

function mapStateToProps(state) {
    const { interviewList, loading } = state.interviews;
    return {
        loading,
        interviewList
    };
}

const connectedInterviewList = connect(mapStateToProps)(InterviewList);
export { connectedInterviewList as InterviewList };

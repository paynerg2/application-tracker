import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

class InterviewList extends Component {
    renderList = () => {
        const { loading, interviews } = this.props;
        return (
            <ul>
                {!loading &&
                    interviews.map(interview => {
                        const { _id, startTime, location } = interview;
                        return (
                            <li key={_id}>
                                <div>{startTime}</div>
                                <div>{location}</div>
                            </li>
                        );
                    })}
            </ul>
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

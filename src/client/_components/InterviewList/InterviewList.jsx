import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { longStackSupport } from 'q';

const InterviewContainer = styled.select`
    width: 88%;
    border: none;
`;
InterviewContainer.displayName = 'InterviewContainer';

class InterviewList extends Component {
    formatDate = value => {
        const options = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        const valueAsDate = new Date(value);
        return valueAsDate.toLocaleDateString('en-US', options);
    };

    renderList = () => {
        const { loading, interviews } = this.props;
        return (
            <InterviewContainer>
                {!loading &&
                    interviews.map(interview => {
                        const { _id, startTime, location } = interview;
                        const formattedDateTime = this.formatDate(startTime);
                        return (
                            <option key={_id}>
                                {`${formattedDateTime}, ${location}`}
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
    const { loading } = state.interviews;
    return {
        loading
    };
}

InterviewList.propTypes = {
    interviews: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool
};

const connectedInterviewList = connect(mapStateToProps)(InterviewList);
export { connectedInterviewList as InterviewList };

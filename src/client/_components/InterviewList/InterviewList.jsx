import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getDateFormattedForList } from '../../_helpers/dateFormatter';

const InterviewContainer = styled.select`
    width: 88%;
    border: none;
`;
InterviewContainer.displayName = 'InterviewContainer';

class InterviewList extends Component {
    renderList = () => {
        const { loading, interviews } = this.props;
        return (
            <InterviewContainer>
                {!loading && interviews.length === 0 && (
                    <option key="add interview">Add interview details</option>
                )}
                {!loading &&
                    interviews.length !== 0 &&
                    interviews.map(interview => {
                        const { _id, startTime, location } = interview;
                        const formattedDateTime = getDateFormattedForList(
                            startTime
                        );
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

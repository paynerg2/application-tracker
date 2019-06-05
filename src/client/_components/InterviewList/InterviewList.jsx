import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

const InterviewContainer = styled.select`
    width: 88%;
`;
InterviewContainer.displayName = 'InterviewContainer';

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

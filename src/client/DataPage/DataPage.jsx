import React, { Component } from 'react';
import { connect } from 'react-redux';

import { applicationActions, interviewActions } from '../_actions';

class DataPage extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        if (this.props.applicationList.length === 0) {
            dispatch(applicationActions.getAll());
        }
        if (this.props.interviewList.length === 0) {
            dispatch(interviewActions.getAll());
        }
    }

    render() {
        const { applicationList, interviewList } = this.props;
        return (
            <React.Fragment>
                <div>Total Applications Sent: {applicationList.length}</div>
                <div>Total Interviews received: {interviewList.length}</div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { applicationList } = state.applications;
    const { interviewList } = state.interviews;
    return {
        applicationList,
        interviewList
    };
}

const connectedDataPage = connect(mapStateToProps)(DataPage);
export { connectedDataPage as DataPage };

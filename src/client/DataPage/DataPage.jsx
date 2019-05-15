import React, { Component } from 'react';
import { connect } from 'react-redux';

import { applicationActions } from '../_actions';

class DataPage extends Component {
    componentDidMount() {
        if (this.props.applicationList.length === 0) {
            const { dispatch } = this.props;
            dispatch(applicationActions.getAll());
        }
    }

    render() {
        const { applicationList } = this.props;
        return (
            <React.Fragment>
                <div>Total Applications Sent: {applicationList.length}</div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { applicationList } = state.applications;
    return {
        applicationList
    };
}

const connectedDataPage = connect(mapStateToProps)(DataPage);
export { connectedDataPage as DataPage };

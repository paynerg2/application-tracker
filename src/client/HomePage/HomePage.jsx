import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

import { applicationActions, interviewActions } from '../_actions';
import { CardList, Container } from './homepage.styles';
import { ApplicationCard } from '../_components/ApplicationCard';

class HomePage extends PureComponent {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(applicationActions.getAll());
        dispatch(interviewActions.getAll());
    }

    render() {
        const { applicationList, loading } = this.props;
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
                    {/* Check to be sure that the list is a non-empty array */}
                    {!loading && applicationList && applicationList.length && (
                        <CardList>
                            {applicationList.map(app => {
                                let interviews = [];
                                const { interviewList } = this.props;
                                if (interviewList && interviewList.length > 0) {
                                    interviews = interviewList.filter(
                                        interview =>
                                            interview.applicationId === app.id
                                    );
                                }
                                return (
                                    <ApplicationCard
                                        key={app.id}
                                        application={app}
                                        interviews={interviews}
                                        history={this.props.history}
                                    />
                                );
                            })}
                        </CardList>
                    )}
                    {applicationList.length === 0 && (
                        <div>Try adding some applications!</div>
                    )}
                </Container>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { applicationList, loading } = state.applications;
    const { interviewList } = state.interviews;
    // sort by submission date, ascending
    applicationList.sort((a, b) => {
        const dateA = new Date(a.dateApplicationSent);
        const dateB = new Date(b.dateApplicationSent);
        return dateA - dateB;
    });
    return {
        applicationList,
        interviewList,
        loading
    };
}

HomePage.propTypes = {
    applicationList: PropTypes.arrayOf(PropTypes.object),
    interviewList: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
};

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };

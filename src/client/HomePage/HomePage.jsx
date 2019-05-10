import React, { Component } from 'react';
import { connect } from 'react-redux';
import { applicationActions } from '../_actions';
import { CardList, Container } from './homepage.styles';
import { ApplicationCard } from '../_components';

/*
    Fake Application data
*/
const application1 = {
    _id: '1',
    jobTitle: 'Software Developer',
    company: 'Generic Software Company',
    location: 'Tech Center, USA',
    mainSkill: 'csharp',
    dateApplicationSent: '1/11/11'
};
const application2 = {
    _id: '2',
    jobTitle: 'Programmer',
    company: 'Financial Institution',
    location: 'Some city, Midwest',
    mainSkill: 'python',
    dateApplicationSent: '1/11/11'
};
const application3 = {
    _id: '3',
    jobTitle: 'Web Developer',
    company: 'The Internet',
    location: 'The Internet',
    mainSkill: 'javascript',
    dateApplicationSent: '1/11/11'
};
//const applicationList = [application1, application2, application3];

class HomePage extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(applicationActions.getAll());
    }

    render() {
        const { applicationList, loading } = this.props;
        return (
            <React.Fragment>
                <Container>
                    {loading && <div>Loading...</div>}
                    {!loading && (
                        <CardList>
                            {applicationList.map(app => {
                                return <ApplicationCard application={app} />;
                            })}
                        </CardList>
                    )}
                </Container>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { applicationList, loading } = state.applications;
    return {
        applicationList,
        loading
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };

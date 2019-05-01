import React, { Component } from 'react';
import { CardList, Container } from './homepage.styles';
import { Header, ApplicationCard } from '../_components';

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
const applicationList = [application1, application2, application3];

export class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <Container>
                    <CardList>
                        {applicationList.map(app => {
                            return <ApplicationCard application={app} />;
                        })}
                    </CardList>
                </Container>
            </React.Fragment>
        );
    }
}

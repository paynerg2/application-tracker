import React from 'react';
import { Application } from '../../../interfaces/application';

import { iconSelector } from '../../../_helpers/iconSelector';
import Link from '../../Link/link';
import { Card, Title, Company, Location, Icon } from './applicationCard.styles';

interface Props {
    application: Application;
}

function ApplicationCard({ application }: Props) {
    const { id, jobTitle, company, location, mainSkill } = application;

    return (
        <Link to={`/applications/${id}`}>
            <Card>
                <Title>{jobTitle}</Title>
                <Company>{company}</Company>
                <Location>{location}</Location>
                <Icon>{iconSelector(mainSkill)}</Icon>
            </Card>
        </Link>
    );
}

export default ApplicationCard;

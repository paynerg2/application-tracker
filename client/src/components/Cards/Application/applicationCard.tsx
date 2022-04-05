import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Application } from '../../../interfaces/application';

import { iconSelector } from '../../../_helpers/iconSelector';
import { Card, Title, Company, Location, Icon } from './applicationCard.styles';

interface Props {
    application: Application;
}

function ApplicationCard({ application }: Props) {
    const navigate = useNavigate();
    const { id, jobTitle, company, location, mainSkill } = application;

    return (
        <Card
            key={id}
            onClick={() => navigate(`/applications/${id}`)}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            layout="position"
        >
            <Title>{jobTitle}</Title>
            <Company>{company}</Company>
            <Location>{location}</Location>
            <Icon>{iconSelector(mainSkill)}</Icon>
        </Card>
    );
}

export default ApplicationCard;

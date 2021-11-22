import React from 'react';
import { Application } from '../../../interfaces/application';
import { iconSelector } from '../../../_helpers/iconSelector';
import { Item, VerticalLine, Date } from './applicationItem.styles';

interface Props {
    application: Application;
}

function ApplicationItem({ application }: Props) {
    const { dateApplicationSent, jobTitle, company, location, mainSkill } = application;
    const month = dateApplicationSent.toLocaleString('default', { month: 'short' });
    const date = dateApplicationSent.getDate();

    return (
        <Item>
            <Date>
                <div>{month}</div>
                <div>
                    <strong>{date}</strong>
                </div>
            </Date>
            <VerticalLine />
            <div>
                <strong>{jobTitle}</strong>
            </div>
            <VerticalLine />
            <div>
                <strong>{company}</strong>
            </div>
            <VerticalLine />
            <div>{location}</div>
            <VerticalLine />
            <div>{iconSelector(mainSkill)}</div>
        </Item>
    );
}

export default ApplicationItem;

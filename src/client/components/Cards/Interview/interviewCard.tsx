import React from 'react';
import { Interview } from '../../../interfaces/interviews';

import { CompanyName, VerticalLine, Info, Item, Time } from './interviewCard.styles';

interface Props {
    interview: Interview;
}

function InterviewCard({ interview }: Props) {
    const { id, startTime, interviewType, company } = interview;
    const month = startTime.toLocaleString('default', { month: 'short' });
    const date = startTime.getDate();
    const time = startTime.toLocaleString('default', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
    });

    return (
        <Item>
            <Time>
                <div style={{ fontWeight: 500 }}>{month}</div>
                <div>
                    <strong>{date}</strong>
                </div>
                <div style={{ fontSize: '0.8rem' }}>{time}</div>
            </Time>
            <VerticalLine />
            <Info>
                <span style={{ fontWeight: 700 }}>{interviewType}</span> interview with{' '}
                <CompanyName>{company}</CompanyName>
            </Info>
        </Item>
    );
}

export default InterviewCard;

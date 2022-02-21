import React, { useState } from 'react';
import { Interview } from '../../../interfaces/interviews';

import { CompanyName, VerticalLine, Info, Item, Time, Actions } from './interviewCard.styles';
import { useDeleteInterviewMutation } from '../../../services/api';
import TextButton from '../../TextButton/textButton';
import { useNavigate } from 'react-router-dom';

interface Props {
    interview: Interview;
}

function InterviewCard({ interview }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const { id, startTime, interviewType, company } = interview;
    const startTimeDate = new Date(startTime);
    const month = startTimeDate.toLocaleString('default', { month: 'short' });
    const date = startTimeDate.getDate();
    const time = startTimeDate.toLocaleString('default', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
    });

    const [deleteInterview] = useDeleteInterviewMutation();

    const handleDelete = async () => {
        await deleteInterview(id!);
    };

    return (
        <>
            {/* @ts-ignore */}
            <Item isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)}>
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
            {/* @ts-ignore */}
            <Actions isOpen={isOpen}>
                <TextButton
                    color="primary"
                    onClick={() => navigate(`/interviews/edit/${interview.id}/1`)}
                >
                    Edit
                </TextButton>
                <TextButton color="destructive" onClick={handleDelete}>
                    Delete
                </TextButton>
            </Actions>
        </>
    );
}

export default InterviewCard;

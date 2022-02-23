import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Interview } from '../../../interfaces/interviews';
import TextButton from '../../TextButton/textButton';
import { CompanyName, VerticalLine, Info, Item, Time, Actions } from './interviewCard.styles';
import { useDeleteInterviewMutation } from '../../../services/api';
import { capitalizeFirstLetter } from '../../../_helpers/capitalize';
import ActionAccordion from '../../ActionAccordion/ActionAccordion';

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

    const handleEdit = () => navigate(`/interviews/edit/${id}/1`);

    return (
        <ActionAccordion isOpen={isOpen} edit={handleEdit} onDelete={handleDelete}>
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
                    <span style={{ fontWeight: 700 }}>{capitalizeFirstLetter(interviewType)}</span>{' '}
                    interview with <CompanyName>{company}</CompanyName>
                </Info>
            </Item>
        </ActionAccordion>
    );
}

export default InterviewCard;

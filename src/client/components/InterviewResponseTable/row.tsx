import React from 'react';
import { Row as StyledRow, ResponseButton, CheckmarkImg } from './InterviewResponseTable.styles';
import { capitalizeFirstLetter } from '../../_helpers/capitalize';
import { Interview } from '../../interfaces/interviews';
import Checkmark from '../../assets/icons8-done.svg';
import Close from '../../assets/icons8-close.svg';
import { interviewResponseTypes } from '../../interfaces/interviews';
import { useEditInterviewMutation } from '../../services/api';

interface Props {
    interview: Interview;
}

const Row = ({ interview }: Props) => {
    const [updateInterview] = useEditInterviewMutation();
    const { interviewType, company, startTime } = interview;
    const startTimeDate = new Date(startTime);
    const month = startTimeDate.toLocaleString('default', { month: 'short' });
    const day = startTimeDate.getDate();

    const date = `${month} ${day}`;
    const info = `${capitalizeFirstLetter(interviewType)} interview with ${company}`;

    const handleResponseChanged = async (response: typeof interviewResponseTypes[number]) => {
        const _interview =
            interview.response === response
                ? { ...interview, response: interviewResponseTypes[0] }
                : { ...interview, response: response };
        await updateInterview(_interview).unwrap();
    };

    return (
        <StyledRow>
            <div>{date}</div>
            <div>{info}</div>
            <div>
                <ResponseButton
                    onClick={() => handleResponseChanged('passed')}
                    name="passed"
                    isChecked={interview.response === 'passed'}
                >
                    {interview.response === 'passed' && (
                        <CheckmarkImg src={Checkmark} alt="checkmark" />
                    )}
                </ResponseButton>
            </div>
            <div>
                <ResponseButton
                    onClick={() => handleResponseChanged('rejected')}
                    name="rejected"
                    isChecked={interview.response === 'rejected'}
                >
                    {interview.response === 'rejected' && <CheckmarkImg src={Close} alt="X" />}
                </ResponseButton>
            </div>
            <div>
                <ResponseButton
                    onClick={() => handleResponseChanged('offer')}
                    name="offer"
                    isChecked={interview.response === 'offer'}
                >
                    {interview.response === 'offer' && (
                        <CheckmarkImg src={Checkmark} alt="checkmark" />
                    )}
                </ResponseButton>
            </div>
        </StyledRow>
    );
};

export default Row;

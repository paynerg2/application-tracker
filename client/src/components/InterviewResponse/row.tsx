import React from 'react';
import { Row as StyledRow, ResponseButton, CheckmarkImg } from './InterviewResponseTable.styles';
import { capitalizeFirstLetter } from '../../_helpers/capitalize';
import { Interview } from '../../interfaces/interviews';
import Checkmark from '../../assets/icons8-done.svg';
import Close from '../../assets/icons8-close.svg';
import { interviewResponseTypes } from '../../interfaces/interviews';
import { useEditInterviewMutation } from '../../services/api';
import { getShortDate } from '../../_helpers/dateHelpers';

interface Props {
    interview: Interview;
    onChange: (response: typeof interviewResponseTypes[number], interview: Interview) => void;
}

const Row = ({ interview, onChange }: Props) => {
    const [updateInterview] = useEditInterviewMutation();
    const { interviewType, company, startTime, response } = interview;

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
            <div>{getShortDate(startTime)}</div>
            <div>{info}</div>
            <div>
                <ResponseButton
                    onClick={() => onChange('passed', interview)}
                    name="passed"
                    isChecked={response === 'passed'}
                >
                    {response === 'passed' && <CheckmarkImg src={Checkmark} alt="checkmark" />}
                </ResponseButton>
            </div>
            <div>
                <ResponseButton
                    onClick={() => onChange('rejected', interview)}
                    name="rejected"
                    isChecked={response === 'rejected'}
                >
                    {response === 'rejected' && <CheckmarkImg src={Close} alt="X" />}
                </ResponseButton>
            </div>
            <div>
                <ResponseButton
                    onClick={() => onChange('offer', interview)}
                    name="offer"
                    isChecked={response === 'offer'}
                >
                    {response === 'offer' && <CheckmarkImg src={Checkmark} alt="checkmark" />}
                </ResponseButton>
            </div>
        </StyledRow>
    );
};

export default Row;

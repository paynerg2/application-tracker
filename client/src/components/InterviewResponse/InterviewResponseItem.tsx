import React from 'react';
import { Interview, interviewResponseTypes } from '../../interfaces/interviews';
import { Container, Details, ResponseRow, Responses } from './InterviewResponseItem.styles';
import { CheckmarkImg, ResponseButton } from './InterviewResponseTable.styles';
import Checkmark from '../../assets/icons8-done.svg';
import Close from '../../assets/icons8-close.svg';
import { getShortDate } from '../../_helpers/dateHelpers';

// Mobile equivalent of the response table

interface Props {
    interview: Interview;
    onChange: (response: typeof interviewResponseTypes[number], interview: Interview) => void;
}

const InterviewResponseItem = ({ interview, onChange }: Props) => {
    const { startTime, company, interviewType, response } = interview;
    console.log(response);

    return (
        <Container>
            <Details>
                <div>{getShortDate(startTime)}</div>
                <div>{`${interviewType} interview with ${company}`}</div>
            </Details>
            <Responses>
                <ResponseRow>
                    <div>Passed</div>
                    <ResponseButton
                        onClick={() => onChange('passed', interview)}
                        name="passed"
                        isChecked={response === 'passed'}
                    >
                        {response === 'passed' && <CheckmarkImg src={Checkmark} alt="checkmark" />}
                    </ResponseButton>
                </ResponseRow>
                <ResponseRow>
                    <div>Rejected</div>
                    <ResponseButton
                        onClick={() => onChange('rejected', interview)}
                        name="rejected"
                        isChecked={response === 'rejected'}
                    >
                        {response === 'rejected' && <CheckmarkImg src={Close} alt="X" />}
                    </ResponseButton>
                </ResponseRow>
                <ResponseRow>
                    <div>Offer</div>
                    <div>
                        <ResponseButton
                            onClick={() => onChange('offer', interview)}
                            name="offer"
                            isChecked={response === 'offer'}
                        >
                            {response === 'offer' && (
                                <CheckmarkImg src={Checkmark} alt="checkmark" />
                            )}
                        </ResponseButton>
                    </div>
                </ResponseRow>
            </Responses>
        </Container>
    );
};

export default InterviewResponseItem;

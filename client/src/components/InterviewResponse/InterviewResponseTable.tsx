import React from 'react';
import Row from './row';
import { Interview, interviewResponseTypes } from '../../interfaces/interviews';
import { Container, Header } from './InterviewResponseTable.styles';

interface Props {
    interviews: Interview[];
    onChange: (response: typeof interviewResponseTypes[number], interview: Interview) => void;
}

const InterviewResponseTable = ({ interviews, onChange }: Props) => {
    return (
        <Container>
            <Header>
                <div>Date</div>
                <div>Info</div>
                <div>Passed</div>
                <div>Rejected</div>
                <div>Offer</div>
            </Header>
            {interviews.map((interview) => (
                <Row key={interview.id} interview={interview} onChange={onChange} />
            ))}
        </Container>
    );
};

export default InterviewResponseTable;

import React from 'react';
import Row from './row';
import { Interview } from '../../interfaces/interviews';
import { Container, Header } from './InterviewResponseTable.styles';

interface Props {
    interviews: Interview[];
}

const InterviewResponseTable = ({ interviews }: Props) => {
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
                <Row key={interview.id} interview={interview} />
            ))}
        </Container>
    );
};

export default InterviewResponseTable;

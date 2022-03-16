import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Interview } from '../../interfaces/interviews';
import InterviewCard from '../Cards/Interview/interviewCard';
import { CircularButton, ListContainer } from './InterviewList.styles';

interface Props {
    interviews: Interview[];
}

function InterviewList({ interviews }: Props) {
    const navigate = useNavigate();

    return (
        <ListContainer>
            {interviews && interviews.length > 0 ? (
                interviews.map((interview) => (
                    <InterviewCard key={interview.id} interview={interview} />
                ))
            ) : (
                <div>No interviews... yet!</div>
            )}
            <CircularButton onClick={() => navigate('/interviews/new/1')}>+</CircularButton>
        </ListContainer>
    );
}

export default InterviewList;

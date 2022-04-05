import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Interview } from '../../interfaces/interviews';
import InterviewCard from '../Cards/Interview/interviewCard';
import { CircularButton, ListContainer, Placeholder } from './InterviewList.styles';

interface Props {
    interviews: Interview[];
    withAdd?: boolean;
}

function InterviewList({ interviews, withAdd = true }: Props) {
    const navigate = useNavigate();

    return (
        <ListContainer>
            {interviews && interviews.length > 0 ? (
                interviews.map((interview) => (
                    <InterviewCard key={interview.id} interview={interview} />
                ))
            ) : (
                <Placeholder>
                    <div>No interviews yet!</div>
                </Placeholder>
            )}
            {withAdd && (
                <CircularButton onClick={() => navigate('/interviews/new')}>+</CircularButton>
            )}
        </ListContainer>
    );
}

export default InterviewList;

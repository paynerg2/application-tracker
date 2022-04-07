import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Interview } from '../../interfaces/interviews';
import InterviewCard from '../Cards/Interview/interviewCard';
import Placeholder from '../Placeholder/placeholder';
import { CircularButton, ListContainer } from './InterviewList.styles';
import NatureImage from '../../assets/Nature.svg';

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
                <Placeholder
                    image={NatureImage}
                    headerText="No Upcoming Interviews"
                    cta="It's only a matter of time!"
                />
            )}
            {withAdd && (
                <CircularButton onClick={() => navigate('/interviews/new')}>+</CircularButton>
            )}
        </ListContainer>
    );
}

export default InterviewList;

import React from 'react';
import { Interview } from '../../interfaces/interviews';
import InterviewCard from '../Cards/Interview/interviewCard';
import Link from '../Link/link';
import { List } from '../List/list';
import { CircularButton } from './InterviewList.styles';

interface Props {
    interviews: Interview[];
}

function InterviewList({ interviews }: Props) {
    return (
        <List style={{ height: 'auto', gap: '2vmin' }}>
            {interviews && interviews.length > 0 ? (
                interviews.map((interview) => (
                    <InterviewCard key={interview.id} interview={interview} />
                ))
            ) : (
                <div>No interviews... yet!</div>
            )}
            <Link
                style={{ alignSelf: 'end', marginRight: '2.5%', marginTop: '2.5%' }}
                to="/interviews/new/1"
            >
                <CircularButton>+</CircularButton>
            </Link>
        </List>
    );
}

export default InterviewList;

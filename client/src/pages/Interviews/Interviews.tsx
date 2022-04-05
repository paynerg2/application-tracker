import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetContactsQuery, useGetInterviewsQuery } from '../../services/api';
import {
    ContactSection,
    InterviewSection,
    Layout,
    MobileButton,
    MobileButtonSection,
    SectionHeader,
} from './Interviews.styles';
import { List } from '../../components/List/list';
import { CircularButton } from '../../components/InterviewList/InterviewList.styles';
import ContactCard from '../../components/Cards/Contact/contactCard';
import SkeletonList from '../../components/List/skeletonList';
import InterviewList from '../../components/InterviewList/InterviewList';
import { pageTransitionProps } from '../../common/animations';
import { useAppSelector } from '../../app/hooks';
import { Interview } from '../../interfaces/interviews';
import InterviewResponseTable from '../../components/InterviewResponseTable/InterviewResponseTable';

function Interviews() {
    const today = new Date();
    const {
        upcomingInterviews,
        previousInterviews,
        isLoading: interviewsLoading,
    } = useGetInterviewsQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => ({
            upcomingInterviews: data?.filter(
                (i: Interview) => new Date(i.startTime).toISOString() > today.toISOString()
            ),
            previousInterviews: data?.filter(
                (i: Interview) => new Date(i.startTime).toISOString() <= today.toISOString()
            ),
            isLoading,
        }),
    });
    const { data: contacts, isLoading: contactsLoading } = useGetContactsQuery();
    const { direction, isGoingToNavSection } = useAppSelector((state) => state.animation);
    const [layoutProps, setLayoutProps] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setLayoutProps(isGoingToNavSection ? { ...pageTransitionProps, custom: direction } : {});
    }, [isGoingToNavSection, direction]);

    return (
        <>
            <Layout {...pageTransitionProps}>
                <InterviewSection>
                    <SectionHeader>Upcoming</SectionHeader>
                    {!interviewsLoading ? (
                        upcomingInterviews && <InterviewList interviews={upcomingInterviews} />
                    ) : (
                        <SkeletonList />
                    )}

                    {!interviewsLoading ? (
                        previousInterviews &&
                        previousInterviews.length > 0 && (
                            <>
                                <SectionHeader>Previous Interviews</SectionHeader>
                                <InterviewResponseTable interviews={previousInterviews} />
                            </>
                        )
                    ) : (
                        <>
                            <SectionHeader>Previous Interviews</SectionHeader>
                            <SkeletonList />
                        </>
                    )}
                </InterviewSection>
                <ContactSection>
                    <SectionHeader>Contacts</SectionHeader>
                    {!contactsLoading ? (
                        contacts && (
                            <List>
                                {contacts?.map((contact) => (
                                    <ContactCard key={contact.id} contact={contact} type="item" />
                                ))}
                                <CircularButton onClick={() => navigate('/contacts/new')}>
                                    +
                                </CircularButton>
                            </List>
                        )
                    ) : (
                        <SkeletonList />
                    )}
                </ContactSection>
            </Layout>
            <MobileButtonSection>
                <MobileButton onClick={() => navigate('/interviews/new')} inverted>
                    Add Interview
                </MobileButton>
                <MobileButton onClick={() => navigate('/contacts/new')} inverted>
                    Add Contact
                </MobileButton>
            </MobileButtonSection>
        </>
    );
}

export default Interviews;

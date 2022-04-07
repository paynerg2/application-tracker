import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetContactsQuery, useGetInterviewsQuery } from '../../services/api';
import { List } from '../../components/List/list';
import { CircularButton } from '../../components/InterviewList/InterviewList.styles';
import ContactCard from '../../components/Cards/Contact/contactCard';
import SkeletonList from '../../components/List/skeletonList';
import InterviewList from '../../components/InterviewList/InterviewList';
import InterviewResponseTable from '../../components/InterviewResponseTable/InterviewResponseTable';
import {
    ContactSection,
    InterviewSection,
    Layout,
    MobileButton,
    MobileButtonSection,
    SectionHeader,
} from './Interviews.styles';
import { pageTransitionProps } from '../../common/animations';
import { Interview } from '../../interfaces/interviews';
import Placeholder from '../../components/Placeholder/placeholder';
import TabsImage from '../../assets/Tabs.svg';

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
    const navigate = useNavigate();

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
                        contacts && contacts.length > 0 ? (
                            <List>
                                {contacts?.map((contact) => (
                                    <ContactCard key={contact.id} contact={contact} type="item" />
                                ))}
                                <CircularButton onClick={() => navigate('/contacts/new')}>
                                    +
                                </CircularButton>
                            </List>
                        ) : (
                            <List>
                                <Placeholder
                                    image={TabsImage}
                                    headerText="No Contacts"
                                    cta="Time to start networking!"
                                />
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

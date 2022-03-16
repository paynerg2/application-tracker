import React from 'react';
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
import InterviewList from '../../components/InterviewList/InterviewList';

function Interviews() {
    const { data: interviews, isLoading: interviewsLoading } = useGetInterviewsQuery();
    const { data: contacts, isLoading: contactsLoading } = useGetContactsQuery();
    const navigate = useNavigate();

    const loading = interviewsLoading || contactsLoading;

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <Layout>
                <InterviewSection>
                    <SectionHeader>
                        <strong>Upcoming</strong>
                    </SectionHeader>
                    {interviews && <InterviewList interviews={interviews} />}
                </InterviewSection>
                <ContactSection>
                    <SectionHeader>
                        <strong>Contacts</strong>
                    </SectionHeader>
                    <List>
                        {contacts?.map((contact) => (
                            <ContactCard key={contact.id} contact={contact} type="item" />
                        ))}
                        <CircularButton onClick={() => navigate('/contacts/new/1')}>
                            +
                        </CircularButton>
                    </List>
                </ContactSection>
            </Layout>
            <MobileButtonSection>
                <MobileButton onClick={() => navigate('/interviews/new/1')} inverted>
                    Add Interview
                </MobileButton>
                <MobileButton inverted>Add Contact</MobileButton>
            </MobileButtonSection>
        </>
    );
}

export default Interviews;

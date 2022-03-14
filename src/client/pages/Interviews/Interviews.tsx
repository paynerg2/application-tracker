import React from 'react';
import { useGetContactsQuery, useGetInterviewsQuery } from '../../services/api';
import { Layout } from './Interviews.styles';
import { List } from '../../components/List/list';
import { CircularButton } from '../../components/InterviewList/InterviewList.styles';
import ContactCard from '../../components/Cards/Contact/contactCard';
import InterviewList from '../../components/InterviewList/InterviewList';
import theme from '../../app/theme/theme';
import Link from '../../components/Link/link';

function Interviews() {
    const { data: interviews, isLoading: interviewsLoading } = useGetInterviewsQuery();
    const { data: contacts, isLoading: contactsLoading } = useGetContactsQuery();

    return (
        <Layout>
            <div style={{ height: '100%' }}>
                <h2 style={{ fontSize: '2em' }}>
                    <strong>Upcoming</strong>
                </h2>
                {interviews && <InterviewList interviews={interviews} />}
            </div>
            <div>
                <h2 style={{ fontSize: '2em', display: 'flex', flexDirection: 'row' }}>
                    <strong>Contacts</strong>
                </h2>
                <List style={{ background: `${theme.color.lightBlue}`, gap: '2vmin' }}>
                    {contacts?.map((contact) => (
                        <ContactCard key={contact.id} contact={contact} type="item" />
                    ))}
                    <Link
                        style={{ alignSelf: 'end', marginRight: '2.5%', marginTop: '2.5%' }}
                        to="/contacts/new/1"
                    >
                        <CircularButton>+</CircularButton>
                    </Link>
                </List>
            </div>
        </Layout>
    );
}

export default Interviews;

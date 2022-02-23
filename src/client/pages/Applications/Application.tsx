import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    useDeleteApplicationMutation,
    useGetApplicationsQuery,
    useGetContactsQuery,
    useGetInterviewsQuery,
} from '../../services/api';
import { iconSelector } from '../../_helpers/iconSelector';
import {
    ApplicationDetails,
    Company,
    Container,
    Layout,
    TitleBanner,
    Location,
    JobTitle,
    SectionHeading,
    ListItem,
    DateSection,
    ButtonGroup,
    RelatedInfoSection,
} from './Application.styles';
import { theme } from '../../app/theme/theme';
import DateContainer from '../../components/DateContainer/dateContainer';
import Button from '../../components/Button/button';
import EditIcon from '../../assets/clarity_edit-solid.png';
import DeleteIcon from '../../assets/ant-design_delete-filled.png';
import InterviewList from '../../components/InterviewList/InterviewList';
import { List } from '../../components/List/list';
import ContactCard from '../../components/Cards/Contact/contactCard';
import Link from '../../components/Link/link';
import Modal from '../../components/Modal/modal';
import ConfirmationDialog from '../../components/ConfirmationDialog/confirmationDialog';

// Note: Declared as type instead of interface to avoid a strange bug
// insisting that id satisfy Record<string, string | undefined>
// after react-router v6 was installed.
// See: https://stackoverflow.com/questions/63617344/how-to-satisfy-the-constraint-of-recordstring-unknown-with-interface
type ApplicationParams = {
    id: string;
};

function Application() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams<ApplicationParams>();
    const { application, ...rest } = useGetApplicationsQuery(undefined, {
        selectFromResult: ({ data, ...rest }) => ({
            ...rest,
            application: data?.find((a) => a.id === id),
        }),
    });
    const { interviews } = useGetInterviewsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            interviews: data?.filter((i) => i.company === application?.company),
        }),
    });
    const { contacts } = useGetContactsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            contacts: data?.filter((c) => c.company === application?.company),
        }),
    });

    const [deleteApplication, { isLoading }] = useDeleteApplicationMutation();

    if (rest.isLoading) {
        return <div>Loading...</div>;
    }

    if (rest.error || !application) {
        return <div>Something went wrong.</div>;
    }

    const getYearsOfExperience = () => {
        const { yearsOfExperience } = application;
        const timeFrame = yearsOfExperience === 1 ? 'year' : 'years';
        return (
            <span>
                <strong>{yearsOfExperience}</strong>
                {` ${timeFrame} of experience`}
            </span>
        );
    };

    const getRequestedDegreeLevel = () => {
        const { degreeLevel } = application;
        let result = 'No degree';
        if (degreeLevel !== 'None') {
            result = degreeLevel;
        }
        return result;
    };

    const getSkillsMetTextColor = (met: number, total: number): string => {
        const fraction = met / total;
        let color = theme.color.desaturatedGray;
        if (fraction <= 0.33) {
            color = theme.color.error;
        } else if (33 < fraction || fraction <= 0.8) {
            color = theme.color.mintGreen;
        } else if (fraction > 0.8 || total === 0) {
            color = theme.color.skyBlue;
        }
        return color;
    };

    const handleDelete = async () => {
        // Since this component should not be routed to if an :id is not present,
        // we insist that it exists.
        await deleteApplication(id!);
        navigate('/applications');
    };

    const handleEdit = () => {
        navigate(`/applications/edit/${application.id}/1`);
    };

    return (
        <>
            <TitleBanner>
                <Container>
                    <Company>{application.company}</Company>
                    <ButtonGroup>
                        <Button
                            style={{ backgroundColor: `${theme.color.error}` }}
                            onClick={() => setShowModal(true)}
                        >
                            <img aria-hidden={true} src={DeleteIcon} alt="Delete Icon" />
                            <span>Delete</span>
                        </Button>
                        <Button inverted onClick={handleEdit}>
                            <img aria-hidden={true} src={EditIcon} alt="Edit Icon" />
                            <span>Edit</span>
                        </Button>
                    </ButtonGroup>
                </Container>
            </TitleBanner>
            <Layout>
                <Container>
                    <ApplicationDetails>
                        <Location>{application.location}</Location>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <JobTitle>{application.jobTitle}</JobTitle>
                            {iconSelector(application.mainSkill, { width: 40, height: 40 })}
                        </div>
                        <SectionHeading>Description</SectionHeading>
                        <ul style={{ columns: 2 }}>
                            <ListItem>{getYearsOfExperience()}</ListItem>
                            <ListItem>
                                <span>
                                    <strong>{getRequestedDegreeLevel()}</strong>
                                    {` required`}
                                </span>
                            </ListItem>
                            <ListItem>
                                <span>
                                    <strong>${application.expectedSalary.toLocaleString()}</strong>
                                    {` expected salary`}
                                </span>
                            </ListItem>
                        </ul>
                        <SectionHeading>Skills</SectionHeading>
                        <ul>
                            <ListItem>
                                <strong
                                    style={{
                                        color: getSkillsMetTextColor(
                                            application.requiredSkillsMet,
                                            application.requiredSkillsTotal
                                        ),
                                    }}
                                >
                                    {application.requiredSkillsMet}
                                </strong>{' '}
                                of <strong>{application.requiredSkillsTotal}</strong> required
                                skills met
                            </ListItem>
                            <ListItem>
                                <strong
                                    style={{
                                        color: getSkillsMetTextColor(
                                            application.additionalSkillsMet,
                                            application.additionalSkillsTotal
                                        ),
                                    }}
                                >
                                    {application.additionalSkillsMet}
                                </strong>{' '}
                                of <strong>{application.additionalSkillsTotal}</strong> additional
                                skills met
                            </ListItem>
                        </ul>
                        <DateSection>
                            <div>
                                <SectionHeading>Posted</SectionHeading>
                                <DateContainer date={application.datePosted} />
                            </div>
                            <div>
                                <SectionHeading>Submitted</SectionHeading>
                                <DateContainer date={application.dateApplicationSent} />
                            </div>
                        </DateSection>
                        <RelatedInfoSection>
                            <div style={{ width: '60%' }}>
                                <SectionHeading>Interviews</SectionHeading>
                                {interviews && <InterviewList interviews={interviews} />}
                            </div>
                            <div style={{ width: '35%' }}>
                                <SectionHeading>Contacts</SectionHeading>
                                {contacts && contacts.length > 0 && (
                                    <List
                                        style={{ background: `${theme.color.lightBlue}`, gap: 0 }}
                                    >
                                        {contacts.map((contact) => (
                                            <ContactCard type="card" contact={contact} />
                                        ))}
                                    </List>
                                )}
                                <Link to="/contacts/new/1">
                                    <Button>Add a New Contact</Button>
                                </Link>
                            </div>
                        </RelatedInfoSection>
                    </ApplicationDetails>
                </Container>
            </Layout>
            <Modal show={showModal}>
                <ConfirmationDialog confirm={handleDelete} cancel={() => setShowModal(false)} />
            </Modal>
        </>
    );
}

export default Application;

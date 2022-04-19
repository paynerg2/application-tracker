import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    useDeleteApplicationMutation,
    useEditApplicationMutation,
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
    Response,
    ResponseGroup,
    Label,
    DetailList,
    ContactsSection,
    InterviewsSection,
} from './Application.styles';
import { theme } from '../../app/theme/theme';
import DateContainer from '../../components/DateContainer/dateContainer';
import Button from '../../components/Button/button';
import EditIcon from '../../assets/clarity_edit-solid.png';
import DeleteIcon from '../../assets/ant-design_delete-filled.png';
import InterviewList from '../../components/InterviewList/InterviewList';
import { List } from '../../components/List/list';
import ContactCard from '../../components/Cards/Contact/contactCard';
import Modal from '../../components/Modal/modal';
import Prompt from '../../components/Prompt/prompt';
import { Application as IApplication } from '../../interfaces/application';
import { motion } from 'framer-motion';
import { pageTransitionProps } from '../../common/animations';
import useWindowDimensions from '../../_helpers/useWindowDimensions';
import { useTheme } from 'styled-components';
import { pixelStringToNumber } from '../../_helpers/stringHelpers';

// Note: Declared as type instead of interface to avoid a strange bug
// insisting that id satisfy Record<string, string | undefined>
// after react-router v6 was installed.
// See: https://stackoverflow.com/questions/63617344/how-to-satisfy-the-constraint-of-recordstring-unknown-with-interface
type ApplicationParams = {
    id: string;
};

function Application() {
    const [showModal, setShowModal] = useState(false);
    const [showAddInterviewPrompt, setShowAddInterviewPrompt] = useState(false);
    const navigate = useNavigate();
    const { width } = useWindowDimensions();
    const theme = useTheme();
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
    const [editApplication] = useEditApplicationMutation();

    if (rest.isLoading) {
        return <div>Loading...</div>;
    }

    if (rest.error || !application) {
        return <div>Something went wrong.</div>;
    }

    const getYearsOfExperience = (): JSX.Element => {
        const { yearsOfExperience } = application;
        const timeFrame = yearsOfExperience === 1 ? 'year' : 'years';
        return (
            <span>
                <strong>{yearsOfExperience}</strong>
                {` ${timeFrame} of experience`}
            </span>
        );
    };

    const getRequestedDegreeLevel = (): string => {
        const { degreeLevel } = application;
        let result = 'No degree';
        if (degreeLevel !== 'None') {
            result = degreeLevel;
        }
        return result;
    };

    const getSkillsMetTextColor = (met: number, total: number): string => {
        const fraction = met / total;
        let color = theme.color.mainText;
        if (fraction <= 0.33) {
            color = theme.color.error;
        } else if (33 < fraction || fraction <= 0.8) {
            color = theme.color.mintGreen;
        } else if (fraction > 0.8 || total === 0) {
            color = theme.color.skyBlue;
        }
        return color;
    };

    const handleDelete = async (): Promise<void> => {
        // Since this component should not be routed to if an :id is not present,
        // we insist that it exists.
        await deleteApplication(id!);
        navigate('/applications');
    };

    const handleEdit = (): void => {
        navigate(`/applications/edit/${application.id}/1`);
    };

    const handleResponseChanged = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const updatedApplication: IApplication = {
            ...application,
            response: e.target.value as typeof application.response,
        };
        await editApplication(updatedApplication);

        if (e.target.value === 'Interview') {
            setShowAddInterviewPrompt(true);
        }
    };

    const isMobileViewport = () => {
        const mobileBreakpoint = pixelStringToNumber(theme.breakpoint.laptop);
        if (width !== null) {
            return width < mobileBreakpoint;
        }
        return false;
    };

    return (
        <motion.div {...pageTransitionProps}>
            <TitleBanner>
                <Container>
                    <Company>{application.company}</Company>
                    <ButtonGroup>
                        <Button
                            style={{ backgroundColor: `${theme.color.error}` }}
                            onClick={() => setShowModal(true)}
                        >
                            <img aria-hidden={true} src={DeleteIcon} alt="Delete Icon" />
                            {!isMobileViewport() && <span>Delete</span>}
                        </Button>
                        <Button inverted onClick={handleEdit}>
                            <img aria-hidden={true} src={EditIcon} alt="Edit Icon" />
                            {!isMobileViewport() && <span>Edit</span>}
                        </Button>
                    </ButtonGroup>
                </Container>
            </TitleBanner>
            <Layout>
                <Container>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '3vw',
                        }}
                    >
                        <ResponseGroup>
                            <Response
                                id="noResponse"
                                name="response"
                                value="No Response"
                                checked={application.response === 'No Response'}
                                onChange={handleResponseChanged}
                            />
                            <Label htmlFor="noResponse">No Response</Label>
                            <Response
                                id="interview"
                                name="response"
                                value="Interview"
                                checked={application.response === 'Interview'}
                                onChange={handleResponseChanged}
                            />
                            <Label htmlFor="interview">Interview</Label>
                            <Response
                                id="rejected"
                                name="response"
                                value="Rejected"
                                checked={application.response === 'Rejected'}
                                onChange={handleResponseChanged}
                            />
                            <Label htmlFor="rejected">Rejected</Label>
                        </ResponseGroup>
                        <ApplicationDetails>
                            <Location>{application.location}</Location>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <JobTitle>{application.jobTitle}</JobTitle>
                                {iconSelector(application.mainSkill, { width: 40, height: 40 })}
                            </div>
                            <SectionHeading>Description</SectionHeading>
                            <DetailList>
                                <ListItem>{getYearsOfExperience()}</ListItem>
                                <ListItem>
                                    <span>
                                        <strong>{getRequestedDegreeLevel()}</strong>
                                        {` required`}
                                    </span>
                                </ListItem>
                                <ListItem>
                                    <span>
                                        <strong>
                                            ${application.expectedSalary.toLocaleString()}
                                        </strong>
                                        {` expected salary`}
                                    </span>
                                </ListItem>
                            </DetailList>
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
                                    of <strong>{application.additionalSkillsTotal}</strong>{' '}
                                    additional skills met
                                </ListItem>
                            </ul>
                            <DateSection>
                                <div id="posted">
                                    <SectionHeading>Posted</SectionHeading>
                                    <DateContainer date={application.datePosted} />
                                </div>
                                <div id="submitted">
                                    <SectionHeading>Submitted</SectionHeading>
                                    <DateContainer date={application.dateApplicationSent} />
                                </div>
                            </DateSection>
                            <RelatedInfoSection>
                                <InterviewsSection>
                                    <SectionHeading id="interviews">Interviews</SectionHeading>
                                    {interviews && <InterviewList interviews={interviews} />}
                                    {isMobileViewport() && (
                                        <Button onClick={() => navigate('/interviews/new')}>
                                            Add a New Interview
                                        </Button>
                                    )}
                                </InterviewsSection>
                                <ContactsSection>
                                    <SectionHeading id="contacts">Contacts</SectionHeading>
                                    {contacts && contacts.length > 0 && (
                                        <List
                                            style={{
                                                background: `${theme.color.secondary}`,
                                                gap: 0,
                                            }}
                                        >
                                            {contacts.map((contact) => (
                                                <ContactCard type="card" contact={contact} />
                                            ))}
                                        </List>
                                    )}
                                    <Button onClick={() => navigate('/contacts/new')}>
                                        Add a New Contact
                                    </Button>
                                </ContactsSection>
                            </RelatedInfoSection>
                        </ApplicationDetails>
                    </div>
                </Container>
            </Layout>
            <Modal show={showModal}>
                <Prompt confirm={handleDelete} cancel={() => setShowModal(false)}>
                    Are you sure you want to do delete this application?
                </Prompt>
            </Modal>
            <Modal show={showAddInterviewPrompt}>
                <Prompt
                    confirm={() => navigate('/interviews/new')}
                    cancel={() => setShowAddInterviewPrompt(false)}
                >
                    Would you like to add this interview now?
                </Prompt>
            </Modal>
        </motion.div>
    );
}

export default Application;

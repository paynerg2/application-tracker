import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Button from '../../components/Button/button';
import {
    ApplicationCardContainer,
    ApplicationListContainer,
    ApplicationListItem,
    Layout,
    NewApplication,
    SubmissionsContainer,
    SubmissionsList,
    applicationListItemHeight,
} from './Applications.styles';
import DateContainer from '../../components/DateContainer/dateContainer';

import { Application } from '../../interfaces/application';
import ApplicationCard from '../../components/Cards/Application/applicationCard';
import { applicationCardHeight } from '../../components/Cards/Application/applicationCard.styles';
import ApplicationFilter from '../../components/Cards/Application/ApplicationFilter';
import { applicationHelpers } from '../../_helpers/applicationHelpers';
import { useGetApplicationsQuery } from '../../services/api';
import { iconSelector } from '../../_helpers/iconSelector';
import { compareDates } from '../../_helpers/dateHelpers';
import { useAppSelector } from '../../app/hooks';
import SkeletonList from '../../components/List/skeletonList';
import { pageTransitionProps } from '../../common/animations';

export interface ApplicationFilters {
    response: string;
    remoteOnly: boolean;
    locations: string[];
    skills: string[];
}

function Applications() {
    const defaultApplicationDisplayStyle = useAppSelector(
        (state) => state.auth.user?.settings?.defaultApplicationDisplayStyle
    );
    const { direction, isGoingToNavSection } = useAppSelector((state) => state.animation);
    const [isCardView, setIsCardView] = useState(defaultApplicationDisplayStyle === 'Card');

    const defaultFilters: ApplicationFilters = {
        response: 'Open',
        remoteOnly: false,
        locations: [],
        skills: [],
    };
    const [filters, setFilters] = useState<ApplicationFilters>(defaultFilters);

    const { data, error, isLoading } = useGetApplicationsQuery();
    const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
    const [layoutProps, setLayoutProps] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        //setIsCardView(defaultApplicationDisplayStyle === 'Card');
        if (data) {
            // Need to act on copies of data, because sorting directly affects the object.
            const applications = [...data];
            setFilteredApplications(applicationHelpers.filterApplications(applications, filters));
        }
    }, [filters, data]);

    useEffect(() => {
        setLayoutProps(isGoingToNavSection ? { ...pageTransitionProps, custom: direction } : {});
    }, [isGoingToNavSection, direction]);

    // Todo: Add a better error dialogue
    if (error || !data) {
        return <div>Something went wrong...</div>;
    }

    const groupedApplications = applicationHelpers.groupApplicationsByDate(filteredApplications);

    const onFilterChange = (newFilter: string, type: string) => {
        if (type === 'response') {
            setFilters((prev) => ({ ...prev, response: prev.response === 'Open' ? '' : 'Open' }));
        }

        if (type === 'remoteOnly') {
            // Toggle remote filter
            setFilters((prev) => ({ ...prev, remoteOnly: !prev.remoteOnly }));
        }

        if (type === 'location') {
            if (filters.locations.includes(newFilter)) {
                // Remove filter, since this means it was unchecked
                setFilters((prev) => ({
                    ...prev,
                    locations: prev.locations.filter((l) => l !== newFilter),
                }));
            } else {
                setFilters((prev) => ({ ...prev, locations: [...prev.locations, newFilter] }));
            }
        }

        if (type === 'skill') {
            if (filters.skills.includes(newFilter)) {
                setFilters((prev) => ({
                    ...prev,
                    skills: prev.skills.filter((l) => l !== newFilter),
                }));
            } else {
                setFilters((prev) => ({ ...prev, skills: [...prev.skills, newFilter] }));
            }
        }
    };

    const getCardView = () => {
        return (
            <>
                {!isLoading ? (
                    <SubmissionsList>
                        <h2>
                            <strong>Submitted Applications</strong>
                        </h2>
                        {/* Map submissions to an application card separated by
                submission date */}
                        {groupedApplications ? (
                            Object.keys(groupedApplications)
                                .sort((a, b) => {
                                    return compareDates(new Date(a), new Date(b), 'descending');
                                })
                                .map((date) => (
                                    <SubmissionsContainer key={date}>
                                        <DateContainer date={date} />
                                        <ApplicationCardContainer>
                                            {groupedApplications[date].map((app: Application) => (
                                                <ApplicationCard key={app.id} application={app} />
                                            ))}
                                        </ApplicationCardContainer>
                                    </SubmissionsContainer>
                                ))
                        ) : (
                            <div>Try adding some applications!</div>
                        )}
                    </SubmissionsList>
                ) : (
                    <SubmissionsList>
                        {[1, 2, 3].map((loading) => (
                            <SkeletonList width={'100%'} height={applicationCardHeight} />
                        ))}
                    </SubmissionsList>
                )}
            </>
        );
    };

    const getListView = () => {
        return (
            <>
                {!isLoading ? (
                    <SubmissionsList>
                        <h2 style={{ fontSize: '2em' }}>
                            <strong>Submitted Applications</strong>
                        </h2>
                        <ApplicationListContainer>
                            {filteredApplications
                                .sort((a, b) => {
                                    return compareDates(
                                        a.dateApplicationSent,
                                        b.dateApplicationSent,
                                        'descending'
                                    );
                                })
                                .map((application) => (
                                    <AnimatePresence>
                                        <ApplicationListItem
                                            key={application.id}
                                            onClick={() =>
                                                navigate(`/applications/${application.id}`)
                                            }
                                            initial={{ width: 0 }}
                                            animate={{ width: '95%' }}
                                            exit={{ x: 0, width: 0, height: 0, opacity: 0 }}
                                        >
                                            <DateContainer date={application.dateApplicationSent} />
                                            <div>
                                                <strong>{application.jobTitle}</strong>
                                            </div>
                                            <div>
                                                <strong>{application.company}</strong>
                                            </div>
                                            <div>{application.location}</div>
                                            <div id="icon">
                                                {iconSelector(application.mainSkill)}
                                            </div>
                                        </ApplicationListItem>
                                    </AnimatePresence>
                                ))}
                        </ApplicationListContainer>
                    </SubmissionsList>
                ) : (
                    <SubmissionsList>
                        {[1, 2, 3, 4].map((loading) => (
                            <SkeletonList width={'100%'} height={applicationListItemHeight} />
                        ))}
                    </SubmissionsList>
                )}
            </>
        );
    };

    return (
        <Layout {...pageTransitionProps}>
            <NewApplication>
                <h2>Add Application</h2>
                <p>Log a new submitted application</p>
                <Button onClick={() => navigate('/applications/new/1')} inverted>
                    New Application
                </Button>
            </NewApplication>
            {isCardView ? getCardView() : getListView()}
            {!isLoading ? (
                <ApplicationFilter
                    applications={data || []}
                    filters={filters}
                    onChange={onFilterChange}
                    setIsCardView={setIsCardView}
                />
            ) : (
                <SkeletonList
                    height={'40vh'}
                    width={'90%'}
                    style={{ gridColumn: '1 / 3', gridRow: 2 }}
                />
            )}
        </Layout>
    );
}

export default Applications;

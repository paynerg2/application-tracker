import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAppSelector } from '../../app/hooks';
import Button from '../../components/Button/button';
import DateContainer from '../../components/DateContainer/dateContainer';
import ApplicationCard from '../../components/Cards/Application/applicationCard';
import SkeletonList from '../../components/List/skeletonList';
import ApplicationFilter from '../../components/Cards/Application/ApplicationFilter';
import EmptyListImage from '../../assets/Empty_List.svg';
import { Application } from '../../interfaces/application';
import { pageTransitionProps } from '../../common/animations';
import { applicationCardHeight } from '../../components/Cards/Application/applicationCard.styles';
import { applicationHelpers } from '../../_helpers/applicationHelpers';
import { useGetApplicationsQuery } from '../../services/api';
import { iconSelector } from '../../_helpers/iconSelector';
import { compareDates } from '../../_helpers/dateHelpers';
import {
    ApplicationListContainer,
    ApplicationListItem,
    Layout,
    NewApplication,
    SubmissionsContainer,
    SubmissionsList,
    applicationListItemHeight,
} from './Applications.styles';
import Placeholder from '../../components/Placeholder/placeholder';
import ApplicationCardContainer from '../../components/ApplicationCardContainer/ApplicationCardContainer';

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
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            // Need to act on copies of data, because sorting directly affects the object.
            const applications = [...data];
            setFilteredApplications(applicationHelpers.filterApplications(applications, filters));
        }
    }, [filters, data]);

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
        if (isLoading) {
            return (
                <SubmissionsList>
                    {[1, 2, 3].map((index) => (
                        <SkeletonList
                            key={`skeleton_${index}`}
                            width={'100%'}
                            height={applicationCardHeight}
                        />
                    ))}
                </SubmissionsList>
            );
        }

        return (
            <>
                {data && data.length > 0 ? (
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
                                    <SubmissionsContainer key={date} layout="position">
                                        <DateContainer date={date} />
                                        <ApplicationCardContainer
                                            applications={groupedApplications[date]}
                                        />
                                    </SubmissionsContainer>
                                ))
                        ) : (
                            <div>Try adding some applications!</div>
                        )}
                    </SubmissionsList>
                ) : (
                    <Placeholder
                        image={EmptyListImage}
                        headerText="No Applications Submitted yet!"
                        cta="Get out there and find your dream job"
                        style={{ width: '100%', height: '20em' }}
                    />
                )}
            </>
        );
    };

    const getListView = () => {
        if (isLoading) {
            return (
                <SubmissionsList>
                    {[1, 2, 3].map((index) => (
                        <SkeletonList
                            key={`skeleton-${index}`}
                            width={'100%'}
                            height={applicationCardHeight}
                        />
                    ))}
                </SubmissionsList>
            );
        }

        return (
            <>
                {data && data.length > 0 ? (
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
                    <Placeholder
                        image={EmptyListImage}
                        headerText="No Applications Submitted yet!"
                        cta="Get out there and find your dream job"
                        style={{ width: '100%', height: '20em' }}
                    />
                )}
            </>
        );
    };

    return (
        <Layout {...pageTransitionProps}>
            <NewApplication>
                <h2>Add Application</h2>
                <p>Log a new submitted application</p>
                <Button onClick={() => navigate('/applications/new')} inverted>
                    New Application
                </Button>
            </NewApplication>
            {isCardView ? getCardView() : getListView()}
            {!isLoading && data ? (
                data.length > 0 && (
                    <ApplicationFilter
                        applications={data}
                        filters={filters}
                        onChange={onFilterChange}
                        setIsCardView={setIsCardView}
                    />
                )
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

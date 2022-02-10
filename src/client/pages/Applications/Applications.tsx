import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';
import {
    ApplicationCardContainer,
    ApplicationListContainer,
    ApplicationListItem,
    Layout,
    NewApplication,
    SubmissionsContainer,
    SubmissionsList,
} from './Applications.styles';
import DateContainer from '../../components/DateContainer/dateContainer';

import { Application } from '../../interfaces/application';
import ApplicationCard from '../../components/Cards/Application/applicationCard';
import ApplicationFilter from '../../components/Cards/Application/ApplicationFilter';
import { applicationHelpers } from '../../_helpers/applicationHelpers';
import { useGetApplicationsQuery } from '../../services/api';
import { iconSelector } from '../../_helpers/iconSelector';

function Applications() {
    const [isCardView, setIsCardView] = useState(true);
    const [filters, setFilters] = useState<string[]>([]);
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

    // Todo: Add a Skeleton (suspense?)
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Todo: Add a better error dialogue
    if (error || !data) {
        return <div>Something went wrong...</div>;
    }

    const groupedApplications = applicationHelpers.groupApplicationsByDate(filteredApplications);

    const onFilterChange = (newFilter: string) => {
        if (filters.includes(newFilter)) {
            // remove
            setFilters((prev) => prev.filter((f) => f !== newFilter));
        } else {
            // add
            setFilters((prev) => prev.concat(newFilter));
        }
    };

    if (error) {
        return <div>Error</div>;
    }

    const getCardView = () => {
        return (
            <>
                {!isLoading ? (
                    <SubmissionsList>
                        <h2 style={{ fontSize: '2em' }}>
                            <strong>Submitted Applications</strong>
                        </h2>
                        {/* Map submissions to an application card separated by
                submission date */}
                        {groupedApplications ? (
                            Object.keys(groupedApplications)
                                .sort((a, b) => {
                                    const aDate = new Date(a);
                                    const bDate = new Date(b);
                                    // Sort in descending order (i.e. newest date first)
                                    return bDate.getTime() - aDate.getTime();
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
                    <div>Loading...</div>
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
                                    const aDate = new Date(a.dateApplicationSent);
                                    const bDate = new Date(b.dateApplicationSent);
                                    // Sort in descending order (i.e. newest date first)
                                    return bDate.getTime() - aDate.getTime();
                                })
                                .map((application) => (
                                    <ApplicationListItem
                                        key={application.id}
                                        onClick={() => navigate(`/applications/${application.id}`)}
                                    >
                                        <DateContainer date={application.dateApplicationSent} />
                                        <div>
                                            <strong>{application.jobTitle}</strong>
                                        </div>
                                        <div>
                                            <strong>{application.company}</strong>
                                        </div>
                                        <div>{application.location}</div>
                                        <div>{iconSelector(application.mainSkill)}</div>
                                    </ApplicationListItem>
                                ))}
                        </ApplicationListContainer>
                    </SubmissionsList>
                ) : (
                    <div>Loading...</div>
                )}
            </>
        );
    };

    return (
        <Layout>
            <NewApplication>
                <h2>Add Application</h2>
                <p>Log a new submitted application</p>
                <Link to="new">
                    <Button inverted>New Application</Button>
                </Link>
            </NewApplication>
            {isCardView ? getCardView() : getListView()}
            <ApplicationFilter
                applications={data || []}
                filters={filters}
                onChange={onFilterChange}
                setIsCardView={setIsCardView}
            />
        </Layout>
    );
}

export default Applications;

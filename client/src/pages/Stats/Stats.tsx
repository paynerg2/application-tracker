import React from 'react';
import Sankey, { SankeyData } from '../../components/SankeyDiagram/sankey';
import { useTheme } from 'styled-components';
import { useGetApplicationsQuery, useGetInterviewsQuery } from '../../services/api';
import {
    formatFrequencyMapForPieChart,
    getCalendarDataFromDates,
    getFrequencyFromArray,
} from '../../_helpers/dataAnalysis';
import {
    ChartLoader,
    Container,
    Layout,
    ChartSection,
    ChartRow,
    ChartContainer,
    ChartHeader,
    Chart,
} from './Stats.styles';
import Calendar from '../../components/CalendarChart/calendar';
import PieChart from '../../components/PieChart/pieChart';
import Placeholder from '../../components/Placeholder/placeholder';
import DataImage from '../../assets/Data.svg';
import { getLastArrayElement } from '../../_helpers/arrayHelpers';
import { addDays, compareDates } from '../../_helpers/dateHelpers';

const Stats = () => {
    const theme = useTheme();
    const {
        total,
        noResponseCount,
        rejectedCount,
        skills,
        submissionDates,
        isLoading: applicationsLoading,
        error: applicationsError,
    } = useGetApplicationsQuery(undefined, {
        selectFromResult: ({ data, isLoading, error }) => ({
            isLoading,
            error,
            total: data?.length,
            noResponseCount: data?.filter((a) => a.response === 'No Response').length,
            rejectedCount: data?.filter((a) => a.response === 'Rejected').length,
            skills: data?.map((a) => a.mainSkill),
            submissionDates: data?.map((a) => new Date(a.dateApplicationSent)),
        }),
    });

    const {
        interviewCount,
        interviewNoResponseCount,
        passedCount,
        interviewRejectedCount,
        offerCount,
        isLoading: interviewsLoading,
        error: interviewsError,
    } = useGetInterviewsQuery(undefined, {
        selectFromResult: ({ data, isLoading, error }) => ({
            isLoading,
            error,
            interviewCount: data?.length,
            interviewNoResponseCount: data?.filter((i) => i.response === 'none').length,
            passedCount: data?.filter((i) => i.response === 'passed' || i.response === 'offer')
                .length,
            interviewRejectedCount: data?.filter((i) => i.response === 'rejected').length,
            offerCount: data?.filter((i) => i.response === 'offer').length,
        }),
    });

    if (applicationsError || interviewsError) return <div>Something went wrong</div>;

    const getCalendarData = () => {
        const { beginning, end } = getSubmissionRange();
        return getCalendarDataFromDates(submissionDates || []);
    };

    const getSubmissionRange = () => {
        if (submissionDates !== undefined && submissionDates.length > 0) {
            // Get unique years
            const sortedDates = submissionDates.sort((a, b) => {
                return compareDates(a, b, 'ascending');
            });

            const earliestDate = addDays(sortedDates[0], -20).toISOString().slice(0, 10);
            const latestDate = addDays(getLastArrayElement(sortedDates), 20)
                .toISOString()
                .slice(0, 10);

            return {
                beginning: earliestDate,
                end: latestDate,
            };
        }

        const today = new Date().toISOString().slice(0, 10);
        return {
            beginning: today,
            end: today,
        };
    };

    const getPieChartData = () => {
        const frequency = getFrequencyFromArray(skills || []);
        return formatFrequencyMapForPieChart(frequency);
    };

    const sankeyNodeIds = {
        sent: 'Applications',
        rejected: 'Rejected',
        noResponse: 'No Response',
        interviews: 'Interviews',
        interviewNoResponse: 'No Contact',
        passed: 'Passed',
        failed: 'Failed',
        offers: 'Offers',
    };

    const getColorByNodeId = (id: string) => {
        if (id === sankeyNodeIds.sent) {
            return theme.color.lightGray;
        } else if (id === sankeyNodeIds.interviews) {
            return theme.color.primary;
        } else if (id === sankeyNodeIds.noResponse || id === sankeyNodeIds.interviewNoResponse) {
            return theme.color.veryLightGray;
        } else if (id === sankeyNodeIds.failed || id === sankeyNodeIds.rejected) {
            return theme.color.error;
        } else if (id === sankeyNodeIds.passed) {
            return theme.color.skyBlue;
        } else if (id === sankeyNodeIds.offers) {
            return theme.color.mintGreen;
        } else {
            return theme.color.primary;
        }
    };

    const getSankeyChartData = () => {
        let data: SankeyData = {
            nodes: [],
            links: [],
        };

        if (total !== undefined && total > 0) {
            data.nodes.push({
                id: sankeyNodeIds.sent,
            });

            if (interviewCount !== undefined && interviewCount > 0) {
                data.nodes.push({
                    id: sankeyNodeIds.interviews,
                });
                data.links.push({
                    source: sankeyNodeIds.sent,
                    target: sankeyNodeIds.interviews,
                    value: interviewCount,
                });
            }

            if (rejectedCount !== undefined && rejectedCount > 0) {
                data.nodes.push({
                    id: sankeyNodeIds.rejected,
                });
                data.links.push({
                    source: sankeyNodeIds.sent,
                    target: sankeyNodeIds.rejected,
                    value: rejectedCount,
                });
            }

            if (noResponseCount !== undefined && noResponseCount > 0) {
                data.nodes.push({
                    id: sankeyNodeIds.noResponse,
                });
                data.links.push({
                    source: sankeyNodeIds.sent,
                    target: sankeyNodeIds.noResponse,
                    value: noResponseCount,
                });
            }

            if (interviewNoResponseCount !== undefined && interviewNoResponseCount > 0) {
                data.nodes.push({
                    id: sankeyNodeIds.interviewNoResponse,
                });
                data.links.push({
                    source: sankeyNodeIds.interviews,
                    target: sankeyNodeIds.interviewNoResponse,
                    value: interviewNoResponseCount,
                });
            }

            if (interviewRejectedCount !== undefined && interviewRejectedCount > 0) {
                data.nodes.push({
                    id: sankeyNodeIds.failed,
                });
                data.links.push({
                    source: sankeyNodeIds.interviews,
                    target: sankeyNodeIds.failed,
                    value: interviewRejectedCount,
                });
            }

            if (passedCount !== undefined && passedCount > 0) {
                data.nodes.push({
                    id: sankeyNodeIds.passed,
                });
                data.links.push({
                    source: sankeyNodeIds.interviews,
                    target: sankeyNodeIds.passed,
                    value: passedCount,
                });
            }

            if (offerCount !== undefined && offerCount > 0) {
                data.nodes.push({
                    id: sankeyNodeIds.offers,
                });
                data.links.push({
                    source: sankeyNodeIds.passed,
                    target: sankeyNodeIds.offers,
                    value: offerCount,
                });
            }
        }

        return data;
    };

    const chartContainerAnimation = {
        initial: {
            height: 0,
            opacity: 0,
        },
        animate: {
            height: 'fit-content',
            opacity: 1,
        },
        transition: {
            duration: 0.4,
        },
    };

    const Loader = () => {
        return <ChartLoader>Chart is loading. Thanks for the patience!</ChartLoader>;
    };

    return (
        <Container>
            <Layout>
                {total && total > 0 ? (
                    <ChartSection id="charts">
                        <ChartRow>
                            {skills ? (
                                <ChartContainer id="skillsPie" {...chartContainerAnimation}>
                                    <ChartHeader>Skills</ChartHeader>
                                    <Chart>
                                        <PieChart data={getPieChartData()} />
                                    </Chart>
                                </ChartContainer>
                            ) : (
                                <Loader />
                            )}
                            {!applicationsLoading && !interviewsLoading ? (
                                <ChartContainer id="sankeyChart" {...chartContainerAnimation}>
                                    <ChartHeader>The job hunt so far</ChartHeader>
                                    <Chart>
                                        <Sankey
                                            data={getSankeyChartData()}
                                            getColor={getColorByNodeId}
                                        />
                                    </Chart>
                                </ChartContainer>
                            ) : (
                                <Loader />
                            )}
                        </ChartRow>
                        <ChartRow>
                            {submissionDates !== undefined && submissionDates.length > 0 ? (
                                <ChartContainer className="calendar" {...chartContainerAnimation}>
                                    <ChartHeader>Application Submission History</ChartHeader>
                                    <Chart style={{ height: '25em' }}>
                                        <Calendar
                                            data={getCalendarData()}
                                            from={getSubmissionRange().beginning}
                                            to={getSubmissionRange().end}
                                        />
                                    </Chart>
                                </ChartContainer>
                            ) : (
                                <Loader />
                            )}
                        </ChartRow>
                    </ChartSection>
                ) : (
                    <Placeholder
                        image={DataImage}
                        headerText="Try Adding Some Applications"
                        cta="Once you've submitted some applications, insights into how the job hunt
                    is going will automatically be generated."
                        style={{ width: '100%', height: '20em', marginTop: '4em' }}
                    />
                )}
            </Layout>
        </Container>
    );
};

export default Stats;

import React from 'react';
import { Chart } from 'react-google-charts';
import Sankey, { SankeyData } from '../../components/SankeyDiagram/sankey';
import { useGetApplicationsQuery, useGetInterviewsQuery } from '../../services/api';
import { getFrequencyMapForCharting } from '../../_helpers/dataAnalysis';
import {
    ChartLoader,
    Container,
    Layout,
    ChartSection,
    ChartRow,
    ChartContainer,
} from './Stats.styles';
import { theme } from '../../app/theme/theme';

interface Props {}

const Stats = () => {
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
        const formattedDates = submissionDates?.map((d) => d.toLocaleDateString('en-Us'));
        const dateFrequency = formattedDates
            ? getFrequencyMapForCharting(formattedDates).map((entry) => [
                  new Date(entry[0]),
                  entry[1],
              ])
            : [];
        console.log(dateFrequency);
        const typeInfo = [
            {
                type: 'date',
                id: 'Date',
            },
            {
                type: 'number',
                id: 'Submissions',
            },
        ];
        const calendarData = [
            typeInfo,
            //@ts-ignore
            ...dateFrequency,
        ];
        console.log(calendarData);
        return calendarData;
    };

    const pieChartData = skills ? getFrequencyMapForCharting(skills) : [];
    const pieChartOptions = {
        title: 'Main Skill Percentage of Submitted Applications',
        sliceVisibilityThreshold: 0.1,
        backgroundColor: 'transparent',
    };
    const calendarChartOptions = {
        title: 'Applications Sent',
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

        console.log(data);

        return data;
    };

    const Loader = () => {
        return (
            <ChartLoader>
                The charts are loading. Sometimes Google takes a while to update them when data
                changes, but don't be too harsh on them. They're a small company doing the best they
                can! Try refreshing the page after some time has passed.
            </ChartLoader>
        );
    };

    return (
        <Container>
            <Layout>
                <ChartSection id="charts">
                    <ChartRow>
                        {!applicationsLoading && skills ? (
                            <ChartContainer id="skillsPieChart">
                                <Chart
                                    chartType="PieChart"
                                    width="500px"
                                    height="400px"
                                    data={[['Skills', 'Submissions'], ...pieChartData]}
                                    options={pieChartOptions}
                                    loader={<Loader />}
                                />
                            </ChartContainer>
                        ) : (
                            <div>Hmmm..</div>
                        )}
                    </ChartRow>
                    <ChartRow>
                        {!applicationsLoading && !interviewsLoading ? (
                            <ChartContainer id="sankeyChart">
                                <Sankey data={getSankeyChartData()} getColor={getColorByNodeId} />
                            </ChartContainer>
                        ) : (
                            <div>Something is wrong</div>
                        )}
                    </ChartRow>
                    <ChartRow>
                        {!applicationsLoading && !interviewsLoading && submissionDates ? (
                            <ChartContainer id="calendarChart">
                                <Chart
                                    chartType="Calendar"
                                    width="950px"
                                    data={getCalendarData()}
                                    options={calendarChartOptions}
                                />
                            </ChartContainer>
                        ) : (
                            <div>Something is amiss</div>
                        )}
                    </ChartRow>
                </ChartSection>
            </Layout>
        </Container>
    );
};

export default Stats;

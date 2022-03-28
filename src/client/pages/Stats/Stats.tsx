import React from 'react';
import { Chart } from 'react-google-charts';
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

interface Props {}

const Stats = () => {
    const {
        total,
        noResponseCount,
        interviewCount,
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
            interviewCount: data?.filter((a) => a.response === 'Interview').length,
            rejectedCount: data?.filter((a) => a.response === 'Rejected').length,
            skills: data?.map((a) => a.mainSkill),
            submissionDates: data?.map((a) => new Date(a.dateApplicationSent)),
        }),
    });

    const {
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

    const getSankeyChartData = () => {
        const labels = ['From', 'To', 'Weight'];

        let data = [];

        if (total && total > 0) {
            if (interviewCount !== undefined && interviewCount > 0) {
                data.push([
                    `Applications Sent: ${total}`,
                    `Interviews: ${interviewCount}`,
                    interviewCount,
                ]);
            }
            if (noResponseCount !== undefined && noResponseCount > 0) {
                data.push([
                    `Applications Sent: ${total}`,
                    `No Response: ${noResponseCount}`,
                    noResponseCount,
                ]);
            }
            if (rejectedCount !== undefined && rejectedCount > 0) {
                data.push([
                    `Applications Sent: ${total}`,
                    `Rejected: ${rejectedCount}`,
                    rejectedCount,
                ]);
            }
            if (interviewNoResponseCount !== undefined && interviewNoResponseCount > 0) {
                data.push([
                    `Interviews: ${interviewCount}`,
                    `No Response: ${interviewNoResponseCount}`,
                    interviewNoResponseCount,
                ]);
            }
            if (passedCount !== undefined && passedCount > 0) {
                data.push([`Interviews: ${interviewCount}`, `Passed: ${passedCount}`, passedCount]);
            }
            if (interviewRejectedCount !== undefined && interviewRejectedCount > 0) {
                data.push([
                    `Interviews: ${interviewCount}`,
                    `Rejected: ${interviewRejectedCount}`,
                    interviewRejectedCount,
                ]);
            }
            if (offerCount !== undefined && offerCount > 0) {
                data.push([`Passed: ${passedCount}`, `Offers: ${offerCount}`, offerCount]);
            }
        }
        console.log(data);
        return [labels, ...data];
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

    const sankeyChartOptions = {
        title: 'The Job Hunt So Far',
        sankey: {
            node: {
                nodePadding: 100,
            },
            interactivity: true,
        },
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
                        {!applicationsLoading ? (
                            <ChartContainer id="sankeyChart">
                                <Chart
                                    chartType="Sankey"
                                    width="400px"
                                    height="400px"
                                    data={getSankeyChartData()}
                                    options={sankeyChartOptions}
                                />
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

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

import { LineGraph } from '../_components/LineGraph';
import { PieChart } from '../_components/PieChart';
import { applicationActions, interviewActions } from '../_actions';
import { ScatterChart } from '../_components/ScatterChart/ScatterChart';

const Container = styled.div`
    display: grid;
    grid-template-columns: 60% 30%;
    grid-template-rows: auto auto;

    @media (max-width: 1200px) {
        display: flex;
        flex-direction: column;
    }
`;
Container.displayName = 'Container';

const Data = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 30px;
    margin: 20px;
    border: solid 1px rgba(0, 0, 0, 0.0975);
    border-radius: 3px;
`;
Data.displayName = 'Data';

const TextData = styled.div`
    padding: 30px;
    margin: 20px;
`;
TextData.displayName = 'TextData';

class DataPage extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        if (this.props.applicationList.length === 0) {
            dispatch(applicationActions.getAll());
        }
        if (this.props.interviewList.length === 0) {
            dispatch(interviewActions.getAll());
        }
    }

    addDays(date, days) {
        const d = new Date(date);
        return d.setDate(d.getDate() + days);
    }

    getDates(startDate, stopDate = new Date()) {
        let dateArray = [];
        let currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date(currentDate));
            currentDate = this.addDays(currentDate, 1);
        }
        return dateArray;
    }

    initCounts(arr) {
        let count = {};
        const input = arr.map(a => new Date(a));
        const minDate = new Date(Math.min.apply(null, input));
        const dateArray = this.getDates(minDate);
        console.log('date array');
        console.log(dateArray);

        for (let i = 0; i < dateArray.length; i++) {
            const entry = dateArray[i].toLocaleDateString('en-US');
            count[entry] = 0;
        }
        return count;
    }

    getFrequencyFromArray(arr, initialCounts = {}) {
        let counts = initialCounts;
        for (let i = 0; i < arr.length; i++) {
            let entry = arr[i];
            counts[entry] = counts[entry] ? counts[entry] + 1 : 1;
        }
        return counts;
    }

    getApplicationSubmissionChartData() {
        const { applicationList } = this.props;

        // Calculate number of applications submitted on each date
        const input = applicationList.map(app =>
            new Date(app.dateApplicationSent).toLocaleDateString('en-US')
        );
        const initialCounts = this.initCounts(input);
        const counts = this.getFrequencyFromArray(input, initialCounts);
        console.log('counts');
        console.log(counts);

        const xAxis = Object.keys(counts).map(d =>
            new Date(d).toLocaleDateString('en-US')
        );
        const yAxis = Object.values(counts);

        // return data in a format chart.js accepts
        const data = {
            datasets: [
                {
                    label: 'Applications Submitted',
                    data: yAxis,
                    borderColor: '#1995ad',
                    backgroundColor: 'rgba(161, 214, 226, 0.5)'
                }
            ],
            labels: xAxis
        };
        return data;
    }

    getSkillChartData() {
        const { applicationList } = this.props;

        const input = applicationList.map(app => app.mainSkill);
        const counts = this.getFrequencyFromArray(input);
        const xAxis = Object.keys(counts);
        const yAxis = Object.values(counts);

        const data = {
            datasets: [
                {
                    label: 'Main Skills',
                    data: yAxis,
                    backgroundColor: [
                        '#1995ad',
                        '#0092cd',
                        '#5287e1',
                        '#a26fda',
                        '#e149b3',
                        '#ff1a73',
                        '#ff3322'
                    ]
                }
            ],
            labels: xAxis
        };
        return data;
    }

    getJobFieldData() {
        const { applicationList } = this.props;

        const input = applicationList
            .filter(app => app.field !== '')
            .map(app => app.field);
        const counts = this.getFrequencyFromArray(input);
        const xAxis = Object.keys(counts);
        const yAxis = Object.values(counts);

        const data = {
            datasets: [
                {
                    label: 'Job Fields',
                    data: yAxis,
                    backgroundColor: [
                        '#1995ad',
                        '#0092cd',
                        '#5287e1',
                        '#a26fda',
                        '#e149b3',
                        '#ff1a73',
                        '#ff3322'
                    ]
                }
            ],
            labels: xAxis
        };
        return data;
    }

    getRejections(months) {
        const submittedApplications = this.getSubmissions(months);
        const rejectedApplications = submittedApplications.filter(
            app => app.response === 'Rejected'
        );
        return rejectedApplications.map(app => app.company);
    }

    getSubmissions(months) {
        const { applicationList } = this.props;
        const today = new Date();
        const dateCutoff = this.addDays(today, -30 * months);
        const submittedApplications = applicationList.filter(
            app => new Date(app.dateApplicationSent) >= dateCutoff
        );
        return submittedApplications;
    }

    getSuccessfulApplications() {
        const { applicationList } = this.props;
        const successfulApplications = applicationList.filter(
            app => app.response === 'Interview'
        );
        return successfulApplications;
    }

    getSuccessfulApplicationSkillsData() {
        const successfulApplications = this.getSuccessfulApplications();

        const data = new Array(successfulApplications.length);
        for (let i = 0; i < successfulApplications.length; i++) {
            const {
                requiredSkillsMet,
                requiredSkillsTotal,
                additionalSkillsMet,
                additionalSkillsTotal
            } = successfulApplications[i];
            data[i] = {
                x: 100 * (requiredSkillsMet / requiredSkillsTotal),
                y: 100 * (additionalSkillsMet / additionalSkillsTotal)
            };
        }
        const dataObject = {
            datasets: [
                {
                    label: 'Successful Skills Data',
                    data: data,
                    pointBorderColor: '#1995ad',
                    pointBackgroundColor: 'rgba(161, 214, 226, 0.5)',
                    pointRadius: 6
                }
            ]
        };
        return dataObject;
    }

    render() {
        const { applicationList, interviewList, loading } = this.props;
        const months = 6;

        const submissionData = this.getApplicationSubmissionChartData();
        const skillData = this.getSkillChartData();
        const rejectionData = this.getRejections(months);
        const recentSubmissions = this.getSubmissions(months).map(
            app => app.company
        );
        const fieldData = this.getJobFieldData();
        const successfulApplicationSkillsData = this.getSuccessfulApplicationSkillsData();
        console.log(successfulApplicationSkillsData);
        return loading ? (
            <div>
                <Loader
                    type="ThreeDots"
                    color="#1995ad"
                    height="50"
                    width="50"
                />
            </div>
        ) : (
            <Container>
                <Data>
                    <LineGraph data={submissionData} />
                </Data>
                <Data>
                    <PieChart data={skillData} title="Main Skill" />
                    <PieChart data={fieldData} title="Job Field" />
                </Data>

                <Data>
                    <ScatterChart data={successfulApplicationSkillsData} />
                </Data>
                <TextData>
                    <div>
                        <div>
                            Total Applications Sent: {applicationList.length}
                        </div>
                        <div>
                            Total Interviews received: {interviewList.length}
                        </div>
                        <div>
                            Submitted applications to {recentSubmissions.length}{' '}
                            companies in the past {months} months
                        </div>
                        <div>
                            Rejected by {rejectionData.length} companies in the
                            past {months} months
                        </div>
                    </div>
                    <div>
                        <div>
                            Submitted to the following companies in the past{' '}
                            {months} months:
                            <ul>
                                {recentSubmissions.map(company => (
                                    <li>{company}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            Rejected by the following companies in the past{' '}
                            {months} months:
                            <ul>
                                {rejectionData.map(company => (
                                    <li>{company}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </TextData>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    const { applicationList, loading } = state.applications;
    const { interviewList } = state.interviews;
    return {
        loading: loading || state.interviews.loading,
        applicationList,
        interviewList
    };
}

DataPage.propTypes = {
    applicationList: PropTypes.arrayOf(PropTypes.object),
    interviewList: PropTypes.arrayOf(PropTypes.object),
    dispatch: PropTypes.func.isRequired
};

const connectedDataPage = connect(mapStateToProps)(DataPage);
export { connectedDataPage as DataPage };

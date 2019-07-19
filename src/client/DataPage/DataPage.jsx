import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

import { LineGraph } from '../_components/LineGraph';
import { PieChart } from '../_components/PieChart';
import { applicationActions, interviewActions } from '../_actions';
import { ScatterChart } from '../_components/ScatterChart/ScatterChart';
import {
    Container,
    Data,
    TextData,
    TextDataHeader,
    AllTimeData,
    SixMonthsData,
    TextHeader,
    CompanyContainer,
    Company
} from './DataPage.styles';
import {
    getApplicationSubmissionChartData,
    getSkillChartData,
    getJobFieldData,
    getRejections,
    getOpenSubmissions,
    getSuccessfulApplicationSkillsData
} from '../_helpers/chartingDataAnalysis';

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

    render() {
        const { applicationList, interviewList, loading } = this.props;
        const months = 6;

        const submissionData = getApplicationSubmissionChartData(
            applicationList
        );
        const skillData = getSkillChartData(applicationList);
        const rejectionData = getRejections(applicationList, months);
        const openSubmissions = getOpenSubmissions(applicationList, months);
        const fieldData = getJobFieldData(applicationList);
        const successfulApplicationSkillsData = getSuccessfulApplicationSkillsData(
            applicationList
        );

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
                    <TextDataHeader>All Time</TextDataHeader>
                    <AllTimeData>
                        <div>
                            <h4>Applications</h4>
                            <h4>{applicationList.length}</h4>
                        </div>
                        <div>
                            <h4>Interviews</h4>
                            <h4>{interviewList.length}</h4>
                        </div>
                    </AllTimeData>
                    <SixMonthsData>
                        <TextDataHeader>Last Six Months</TextDataHeader>
                        <div>
                            <TextHeader>Open Submissions</TextHeader>
                            <CompanyContainer>
                                {openSubmissions.map(company => (
                                    <Company>{company}</Company>
                                ))}
                            </CompanyContainer>
                        </div>
                        <div>
                            <TextHeader>Rejections</TextHeader>
                            <CompanyContainer>
                                {rejectionData.map(company => (
                                    <Company>{company}</Company>
                                ))}
                            </CompanyContainer>
                        </div>
                    </SixMonthsData>
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

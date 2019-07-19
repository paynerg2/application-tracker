import { addDays, initCounts, getFrequencyFromArray } from './dataAnalysis';

export const getApplicationSubmissionChartData = applicationList => {
    // Calculate number of applications submitted on each date
    const input = applicationList.map(app =>
        new Date(app.dateApplicationSent).toLocaleDateString('en-US')
    );
    const initialCounts = initCounts(input);
    const counts = getFrequencyFromArray(input, initialCounts);

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
};

export const getSkillChartData = applicationList => {
    const input = applicationList.map(app => app.mainSkill);
    const counts = getFrequencyFromArray(input);
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
};

export const getJobFieldData = applicationList => {
    const input = applicationList
        .filter(app => app.field !== '')
        .map(app => app.field);
    const counts = getFrequencyFromArray(input);
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
};

export const getRejections = (applicationList, months) => {
    const submittedApplications = getSubmissions(applicationList, months);
    const rejectedApplications = submittedApplications.filter(
        app => app.response === 'Rejected'
    );
    return rejectedApplications.map(app => app.company);
};

export const getSubmissions = (applicationList, months) => {
    const today = new Date();
    const dateCutoff = addDays(today, -30 * months);
    const submittedApplications = applicationList.filter(
        app => new Date(app.dateApplicationSent) >= dateCutoff
    );
    return submittedApplications;
};

export const getOpenSubmissions = (applicationList, months) => {
    const submittedApplications = getSubmissions(applicationList, months);
    const OpenApplications = submittedApplications.filter(
        app => app.response !== 'Rejected'
    );
    return OpenApplications.map(app => app.company);
};

export const getSuccessfulApplications = applicationList => {
    const successfulApplications = applicationList.filter(
        app => app.response === 'Interview'
    );
    return successfulApplications;
};

export const getSuccessfulApplicationSkillsData = applicationList => {
    const successfulApplications = getSuccessfulApplications(applicationList);

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
};

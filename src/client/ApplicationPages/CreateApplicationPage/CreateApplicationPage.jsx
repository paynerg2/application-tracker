import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { history } from '../../_helpers';
import { applicationActions } from '../../_actions';

import {
    FormContainer,
    H2Text,
    FormGroup,
    Input,
    HelpBlock,
    Button
} from '../../AuthPages/form';

class CreateApplicationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            applicationId: null,
            jobTitle: '',
            company: '',
            jobDescriptionLink: '',
            requiredSkillsTotal: 0,
            requiredSkillsMet: 0,
            additionalSkillsTotal: 0,
            additionalSkillsMet: 0,
            yearsOfExperience: 0,
            degreeLevel: 'None',
            contract: 'full-time',
            temp: false,
            arbitraryRelocation: false,
            location: '',
            mainSkill: '',
            datePosted: '',
            dateApplicationSent: '',
            givenReferral: false,
            companyLinkedIn: '',
            expectedSalary: 0,
            field: '',
            response: 'No Response'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // If an application Id is passed to the page, user this as
        // an edit page and pre-fill values.
        const {
            match: { params }
        } = this.props;
        // !Consider not changing state, get id from params later
        if (params.applicationId) {
            this.setState({ applicationId: params.applicationId });
            const { applicationList } = this.props;
            const selectedApplication = applicationList.find(
                app => app._id === params.applicationId
            );
            if (selectedApplication) {
                this.setState({ ...selectedApplication });
            }
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { jobTitle, company } = this.state;
        const { dispatch } = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        // validation of required fields before dispatch
        if (user && jobTitle && company) {
            // destructuring to remove the piece of state outside of schema
            const {
                submitted,
                applicationId,
                ...applicationParams
            } = this.state;

            const newApplication = {
                ...applicationParams,
                user: user._id
            };

            applicationId
                ? dispatch(
                      applicationActions.update(applicationId, newApplication)
                  )
                : dispatch(applicationActions.create(newApplication));
        }
    }

    render() {
        const {
            submitted,
            applicationId,
            jobTitle,
            company,
            jobDescriptionLink,
            requiredSkillsTotal,
            requiredSkillsMet,
            additionalSkillsTotal,
            additionalSkillsMet,
            yearsOfExperience,
            degreeLevel,
            contract,
            temp,
            arbitraryRelocation,
            location,
            mainSkill,
            datePosted,
            dateApplicationSent,
            givenReferral,
            companyLinkedIn,
            expectedSalary,
            field
        } = this.state;
        return (
            <FormContainer>
                <H2Text>
                    {applicationId ? 'Edit ' : 'Add a new '}Application
                </H2Text>
                <form
                    name="form"
                    onSubmit={this.handleSubmit}
                    autoComplete="off"
                >
                    <FormGroup>
                        <label htmlFor="jobTitle">Job Title</label>
                        <Input
                            type="text"
                            name="jobTitle"
                            value={jobTitle}
                            onChange={this.handleChange}
                        />
                        {submitted && !jobTitle && (
                            <HelpBlock>Job Title is required</HelpBlock>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="company">Company</label>
                        <Input
                            type="text"
                            name="company"
                            value={company}
                            onChange={this.handleChange}
                        />
                        {submitted && !company && (
                            <HelpBlock>Company name is required</HelpBlock>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="jobDescriptionLink">
                            Link to Job Description
                        </label>
                        <Input
                            type="url"
                            name="jobDescriptionLink"
                            value={jobDescriptionLink}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="requiredSkillsTotal">
                            Required Skills
                        </label>
                        <Input
                            type="number"
                            name="requiredSkillsTotal"
                            value={requiredSkillsTotal}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="requiredSkillsMet">
                            Required Skills Met
                        </label>
                        <Input
                            type="number"
                            name="requiredSkillsMet"
                            value={requiredSkillsMet}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="additionalSkillsTotal">
                            Additioanl Skills Total
                        </label>
                        <Input
                            type="number"
                            name="additionalSkillsTotal"
                            value={additionalSkillsTotal}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="additionalAkillsMet">
                            Additional Skills Met
                        </label>
                        <Input
                            type="number"
                            name="additionalSkillsMet"
                            value={additionalSkillsMet}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="yearsOfExperience">
                            Requested Years of Experience
                        </label>
                        <Input
                            type="number"
                            name="yearsOfExperience"
                            value={yearsOfExperience}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="degreeLevel">
                            Required Degree Level
                        </label>
                        <select
                            name="degreeLevel"
                            value={degreeLevel}
                            onChange={this.handleChange}
                        >
                            <option value="None">None</option>
                            <option value="Associates">Associates</option>
                            <option value="Bachelors">Bachelors</option>
                            <option value="Masters">Masters</option>
                            <option value="Ph.D">Ph.D</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="contract">Contract Type</label>
                        <select
                            name="contract"
                            value={contract}
                            onChange={this.handleChange}
                        >
                            <option value="full-time">full-time</option>
                            <option value="part-time">part-time</option>
                            <option value="contract">contract</option>
                            <option value="contract-to-hire">
                                contract-to-hire
                            </option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="temp">Temp?</label>
                        <Input
                            type="checkbox"
                            name="temp"
                            value={temp}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="arbitraryRelocation">
                            Arbitrary Relocation Required?
                        </label>
                        <Input
                            type="checkbox"
                            name="arbitraryRelocation"
                            value={arbitraryRelocation}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="location">Location</label>
                        <Input
                            type="text"
                            name="location"
                            value={location}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="mainSkill">Main Skill</label>
                        <Input
                            type="text"
                            name="mainSkill"
                            value={mainSkill}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="datePosted">Date Posted</label>
                        <Input
                            type="date"
                            name="datePosted"
                            value={datePosted}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="dateApplicationSent">
                            Date Application Submitted
                        </label>
                        <Input
                            type="date"
                            name="dateApplicationSent"
                            value={dateApplicationSent}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="givenReferral">Referral?</label>
                        <Input
                            type="checkbox"
                            name="givenReferral"
                            value={givenReferral}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="companyLinkedIn">
                            Company LinkedIn
                        </label>
                        <Input
                            type="url"
                            name="companyLinkedIn"
                            value={companyLinkedIn}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="expectedSalary">Expected Salary</label>
                        <Input
                            type="number"
                            name="expectedSalary"
                            value={expectedSalary}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="field">Job Field</label>
                        <Input
                            type="text"
                            name="field"
                            value={field}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Button>Submit</Button>
                    </FormGroup>
                </form>
                <Button onClick={() => this.props.history.goBack()}>
                    Cancel
                </Button>
            </FormContainer>
        );
    }
}

function mapStateToProps(state) {
    const { applicationList } = state.applications;
    return {
        applicationList
    };
}

// connect to authorization and application services
const connectedCreateApplicationPage = connect(mapStateToProps)(
    CreateApplicationPage
);
export { connectedCreateApplicationPage as CreateApplicationPage };

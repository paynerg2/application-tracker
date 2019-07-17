import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { applicationActions } from '../../_actions';
import { validateField, validateForm } from '../../_helpers/validator';

import {
    PageContainer,
    FormContainer,
    H2Text,
    FormGroup,
    Column,
    Input,
    SelectInput,
    Checkbox,
    CheckboxGroup,
    MultiCheckbox,
    HelpBlock,
    Button,
    ButtonContainer
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
            response: 'No Response',
            errors: {
                jobDescriptionLink: '',
                requiredSkills: '',
                additionalSkills: '',
                yearsOfExperience: '',
                datePostedDate: '',
                datePostedRelativeDate: '',
                dateApplicationSentDate: '',
                dateApplicationSentRelativeDate: '',
                companyLinkedIn: '',
                expectedSalary: ''
            }
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
        this.setState({ [name]: value }, () =>
            this.validate(name, value, this.state)
        );
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { errors, company, location } = this.state;
        const { dispatch } = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        // validation of required fields before dispatch
        const valid = validateForm(errors);
        if (user && company && location && valid) {
            // destructuring to remove the piece of state outside of schema
            const {
                submitted,
                applicationId,
                errors,
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
    validate(fieldName, value, state) {
        const errors = validateField(fieldName, value, state);
        this.setState({ errors: errors });
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
            field,
            errors
        } = this.state;
        return (
            <React.Fragment>
                <PageContainer>
                    <H2Text>
                        {applicationId ? 'Edit ' : 'Add a new '}Application
                    </H2Text>
                    <FormContainer
                        name="form"
                        onSubmit={this.handleSubmit}
                        autoComplete="off"
                    >
                        <Column>
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
                                    <HelpBlock>
                                        Company name is required
                                    </HelpBlock>
                                )}
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
                                {errors.datePostedDate && (
                                    <HelpBlock>
                                        {errors.datePostedDate}
                                    </HelpBlock>
                                )}
                                {errors.datePostedRelativeDate && (
                                    <HelpBlock>
                                        {errors.datePostedRelativeDate}
                                    </HelpBlock>
                                )}
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
                                {errors.dateApplicationSentDate && (
                                    <HelpBlock>
                                        {errors.dateApplicationSentDate}
                                    </HelpBlock>
                                )}
                                {errors.dateApplicationSentRelativeDate && (
                                    <HelpBlock>
                                        {errors.dateApplicationSentRelativeDate}
                                    </HelpBlock>
                                )}
                            </FormGroup>
                        </Column>
                        <Column>
                            {errors.requiredSkills && (
                                <HelpBlock>{errors.requiredSkills}</HelpBlock>
                            )}
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
                            {errors.additionalSkills && (
                                <HelpBlock>{errors.additionalSkills}</HelpBlock>
                            )}
                            <FormGroup>
                                <label htmlFor="additionalSkillsTotal">
                                    Additional Skills Total
                                </label>
                                <Input
                                    type="number"
                                    name="additionalSkillsTotal"
                                    value={additionalSkillsTotal}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="additionalSkillsMet">
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
                                {errors.yearsOfExperience && (
                                    <HelpBlock>
                                        {errors.yearsOfExperience}
                                    </HelpBlock>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="degreeLevel">
                                    Required Degree Level
                                </label>
                                <SelectInput
                                    name="degreeLevel"
                                    value={degreeLevel}
                                    onChange={this.handleChange}
                                >
                                    <option value="None">None</option>
                                    <option value="Associates">
                                        Associates
                                    </option>
                                    <option value="Bachelors">Bachelors</option>
                                    <option value="Masters">Masters</option>
                                    <option value="Ph.D">Ph.D</option>
                                </SelectInput>
                            </FormGroup>
                        </Column>
                        <Column>
                            <FormGroup>
                                <label htmlFor="contract">Contract Type</label>
                                <SelectInput
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
                                </SelectInput>
                            </FormGroup>
                            <FormGroup>
                                <CheckboxGroup>
                                    <label htmlFor="arbitraryRelocation">
                                        Arbitrary Relocation Required?
                                    </label>
                                    <Checkbox
                                        type="checkbox"
                                        name="arbitraryRelocation"
                                        value={arbitraryRelocation}
                                        onChange={this.handleChange}
                                    />
                                </CheckboxGroup>
                            </FormGroup>
                            <MultiCheckbox>
                                <FormGroup>
                                    <CheckboxGroup>
                                        <label htmlFor="temp">Temp?</label>
                                        <Checkbox
                                            type="checkbox"
                                            name="temp"
                                            value={temp}
                                            onChange={this.handleChange}
                                        />
                                    </CheckboxGroup>
                                </FormGroup>
                                <FormGroup>
                                    <CheckboxGroup>
                                        <label htmlFor="givenReferral">
                                            Referral?
                                        </label>
                                        <Checkbox
                                            type="checkbox"
                                            name="givenReferral"
                                            value={givenReferral}
                                            onChange={this.handleChange}
                                        />
                                    </CheckboxGroup>
                                </FormGroup>
                            </MultiCheckbox>
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
                                {submitted && errors.jobDescriptionLink && (
                                    <HelpBlock>
                                        {errors.jobDescriptionLink}
                                    </HelpBlock>
                                )}
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
                                {submitted && errors.companyLinkedIn && (
                                    <HelpBlock>
                                        {errors.companyLinkedIn}
                                    </HelpBlock>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="expectedSalary">
                                    Expected Salary
                                </label>
                                <Input
                                    type="number"
                                    name="expectedSalary"
                                    value={expectedSalary}
                                    onChange={this.handleChange}
                                />
                                {errors.expectedSalary && (
                                    <HelpBlock>
                                        {errors.expectedSalary}
                                    </HelpBlock>
                                )}
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
                        </Column>
                    </FormContainer>
                    <ButtonContainer>
                        <FormGroup>
                            <Button disable={true}>Submit</Button>
                            <Button onClick={() => this.props.history.goBack()}>
                                Cancel
                            </Button>
                        </FormGroup>
                    </ButtonContainer>
                </PageContainer>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { applicationList } = state.applications;
    return {
        applicationList
    };
}

CreateApplicationPage.propTypes = {
    applicationList: PropTypes.arrayOf(PropTypes.object),
    dispatch: PropTypes.func.isRequired
};

// connect to authorization and application services
const connectedCreateApplicationPage = connect(mapStateToProps)(
    CreateApplicationPage
);
export { connectedCreateApplicationPage as CreateApplicationPage };

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { interviewActions } from '../../_actions';
import { validateField, validateForm } from '../../_helpers/validator';
import { getDateTimeFormattedForInput } from '../../_helpers/dateFormatter';

import {
    PageContainer,
    FormContainer,
    H2Text,
    FormGroup,
    Column,
    Input,
    Checkbox,
    CheckboxGroup,
    HelpBlock,
    Button,
    CancelButton,
    ButtonContainer
} from '../../AuthPages/form';

class CreateInterviewPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            applicationId: null,
            interviewId: null,
            startTime: '',
            location: '',
            contact: '',
            followUpSent: false,
            response: '',
            offer: 0,
            interviewType: '',
            round: 1,
            notes: '',
            errors: {
                offer: '',
                round: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const {
            match: { params }
        } = this.props;
        if (params.applicationId) {
            this.setState({ applicationId: params.applicationId });
        }
        // ! May decide to change strategy to not update state
        if (params.interviewId) {
            this.setState({ interviewId: params.interviewId });

            const { interviewList } = this.props;
            const selectedInterview = interviewList.find(
                interview => interview._id === params.interviewId
            );
            if (selectedInterview) {
                const formattedStartTime = getDateTimeFormattedForInput(
                    selectedInterview.startTime
                );
                this.setState({
                    ...selectedInterview,
                    startTime: formattedStartTime
                });
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
        const { startTime, applicationId, errors } = this.state;
        const { dispatch } = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        const valid = validateForm(errors);
        if (user && applicationId && startTime && valid) {
            const { submitted, interviewId, ...interviewParams } = this.state;

            const newInterview = {
                ...interviewParams,
                user: user._id
            };

            interviewId
                ? dispatch(interviewActions.update(interviewId, newInterview))
                : dispatch(interviewActions.create(newInterview));
        }
    }

    validate(fieldName, value, state) {
        const errors = validateField(fieldName, value, state);
        this.setState({ errors: errors });
    }

    render() {
        const {
            submitted,
            interviewId,
            startTime,
            location,
            contact,
            followUpSent,
            response,
            offer,
            interviewType,
            round,
            notes
        } = this.state;
        return (
            <PageContainer>
                <H2Text>{interviewId ? 'Edit ' : 'Add a new '}Interview</H2Text>
                <FormContainer
                    name="form"
                    onSubmit={this.handleSubmit}
                    autoComplete="off"
                >
                    <Column>
                        <FormGroup>
                            <label htmlFor="startTime">Start Time</label>
                            <Input
                                type="datetime-local"
                                name="startTime"
                                value={startTime}
                                onChange={this.handleChange}
                            />
                            {submitted && !startTime && (
                                <HelpBlock>Start Time is required</HelpBlock>
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
                            <label htmlFor="contact">Contact</label>
                            <Input
                                type="text"
                                name="contact"
                                value={contact}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <CheckboxGroup>
                                <label htmlFor="followUpSent">
                                    Follow Up Sent?
                                </label>
                                <Checkbox
                                    type="checkbox"
                                    name="followUpSent"
                                    value={followUpSent}
                                    onChange={this.handleChange}
                                />
                            </CheckboxGroup>
                        </FormGroup>
                        <FormGroup>
                            <CheckboxGroup>
                                <label htmlFor="response">Response</label>
                                <Checkbox
                                    type="checkbox"
                                    name="response"
                                    value={response}
                                    onChange={this.handleChange}
                                />
                            </CheckboxGroup>
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="offer">Offer</label>
                            <Input
                                type="number"
                                name="offer"
                                value={offer}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="interviewType">
                                Interview Type
                            </label>
                            <Input
                                type="text"
                                name="interviewType"
                                value={interviewType}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="round">Round</label>
                            <Input
                                type="number"
                                name="round"
                                value={round}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="notes">Notes</label>
                            <Input
                                type="text"
                                name="notes"
                                value={notes}
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <ButtonContainer>
                            <FormGroup>
                                <Button>Submit</Button>
                                <CancelButton
                                    onClick={() => this.props.history.goBack()}
                                >
                                    Cancel
                                </CancelButton>
                            </FormGroup>
                        </ButtonContainer>
                    </Column>
                </FormContainer>
            </PageContainer>
        );
    }
}

function mapStateToProps(state) {
    const { interviewList } = state.interviews;
    return {
        interviewList
    };
}

CreateInterviewPage.propTypes = {
    intervieList: PropTypes.arrayOf(PropTypes.object),
    dispatch: PropTypes.func.isRequired
};

const connectedCreateInterviewPage = connect(mapStateToProps)(
    CreateInterviewPage
);
export { connectedCreateInterviewPage as CreateInterviewPage };

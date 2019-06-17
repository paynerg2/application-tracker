import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { applicationActions, interviewActions } from '../../_actions';
import { ProgressBar } from '../ProgressBar';
import { InterviewList } from '../InterviewList';
import { CardListItem, Dropdown, Button } from '../Card.styles';
import { ReactComponent as EditIcon } from '../../_assets/icons8-edit-50.svg';
import { ReactComponent as DeleteIcon } from '../../_assets/icons8-trash-50.svg';
import { ReactComponent as DownChevron } from '../../_assets/down-chevron.svg';
import { iconSelector } from '../../_helpers/iconSelector';

const RightColumn = styled.div`
    display: grid;
    grid-template-rows: 30% 30% 30%;
    justify-items: center;
    align-items: center;
    align-content: space-between;
`;
RightColumn.displayName = 'RightColumn';

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
LeftColumn.displayName = 'LeftColumn';

const Bottom = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
`;
Bottom.displayName = 'Bottom';

const Title = styled.div`
    font-weight: bold;
    border-bottom: solid 1px rgba(0, 0, 0, 0.0975);
`;
Title.displayName = 'Title';

const Location = styled.div`
    font-style: italic;
`;
Location.displayName = 'Location';

const UpdateButton = styled(Button)`
    box-shadow: 1px 2px 6px 1px darkgrey;
`;
UpdateButton.displayName = 'UpdateButton';

class ApplicationCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSelected: false,
            showEditButtons: false
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleResponseUpdate = this.handleResponseUpdate.bind(this);
    }

    handleDelete(id) {
        // Delete the selected application, and any associated interviews.
        const { dispatch, interviews } = this.props;
        dispatch(applicationActions.delete(this.props.application._id));
        interviews.forEach(interview =>
            dispatch(interviewActions.delete(interview._id))
        );
    }

    handleResponseUpdate(e) {
        const { dispatch } = this.props;
        const { id } = this.props.application;
        const selectedApplication = this.props.applicationList.find(
            app => app.id === id
        );

        if (selectedApplication) {
            dispatch(
                applicationActions.update(id, {
                    ...selectedApplication,
                    response: e.target.value
                })
            );
        }

        if (e.target.value === 'Interview') {
            this.props.history.push(`applications/${id}/interviews`);
        }
    }

    formatDate(date) {
        if (date) {
            const d = new Date(date);
            return d.toLocaleDateString('en-US');
        }
        return '';
    }

    renderCard = application => {
        const {
            _id,
            jobTitle,
            company,
            location,
            mainSkill,
            dateApplicationSent,
            response,
            requiredSkillsMet,
            requiredSkillsTotal,
            additionalSkillsMet,
            additionalSkillsTotal
        } = application;
        const { interviews } = this.props;
        return (
            <React.Fragment>
                <LeftColumn>
                    <div>
                        <Title>{jobTitle}</Title>
                        <div>{company}</div>
                    </div>
                    <Location>{location}</Location>

                    <Bottom>
                        <div>
                            {interviews.length === 0 && (
                                <Dropdown
                                    value={response}
                                    onChange={e => this.handleResponseUpdate(e)}
                                >
                                    <option value="No Response">
                                        No Response
                                    </option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Interview">
                                        Add Interview
                                    </option>
                                </Dropdown>
                            )}
                            {response === 'Interview' && (
                                <React.Fragment>
                                    <InterviewList interviews={interviews} />
                                    <Button
                                        onClick={() =>
                                            this.props.history.push(
                                                `/applications/${_id}/interviews`
                                            )
                                        }
                                    >
                                        +
                                    </Button>
                                </React.Fragment>
                            )}
                        </div>
                        <div>
                            <ProgressBar
                                fill={
                                    requiredSkillsTotal > 0
                                        ? (requiredSkillsMet /
                                              requiredSkillsTotal) *
                                          100
                                        : 0
                                }
                            />
                            <ProgressBar
                                fill={
                                    additionalSkillsTotal > 0
                                        ? (additionalSkillsMet /
                                              additionalSkillsTotal) *
                                          100
                                        : 0
                                }
                            />
                        </div>
                    </Bottom>
                </LeftColumn>
                <RightColumn>
                    <div>
                        <div
                            onClick={() =>
                                this.setState({
                                    showEditButtons: !this.state.showEditButtons
                                })
                            }
                        >
                            <DownChevron />
                        </div>
                        {this.state.showEditButtons && (
                            <div>
                                <Link to={`/applications/${_id}`}>
                                    <UpdateButton>
                                        <EditIcon />
                                    </UpdateButton>
                                </Link>
                                <UpdateButton onClick={this.handleDelete}>
                                    <DeleteIcon />
                                </UpdateButton>
                            </div>
                        )}
                    </div>
                    <div>{iconSelector(mainSkill)}</div>
                    <div>{this.formatDate(dateApplicationSent)}</div>
                </RightColumn>
            </React.Fragment>
        );
    };

    render() {
        return (
            <CardListItem
                onMouseEnter={() => this.setState({ isSelected: true })}
                onMouseLeave={() => this.setState({ isSelected: false })}
            >
                {this.renderCard(this.props.application)}
            </CardListItem>
        );
    }
}

function mapStateToProps(state) {
    const { applicationList } = state.applications;
    return {
        applicationList
    };
}

ApplicationCard.propTypes = {
    applicationList: PropTypes.array,
    application: PropTypes.object,
    interviews: PropTypes.array,
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

const connectedApplicationCard = connect(mapStateToProps)(ApplicationCard);
export { connectedApplicationCard as ApplicationCard };

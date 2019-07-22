import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { interviewActions } from '../../_actions';
import { CardListItem, Button } from '../Card.styles';
import { DateDisplay, DateNumber, Month, Time } from './InterviewCard.styles';
import { ReactComponent as EditIcon } from '../../_assets/icons8-edit-50.svg';
import { ReactComponent as DeleteIcon } from '../../_assets/icons8-trash-50.svg';
import { ReactComponent as DownChevron } from '../../_assets/down-chevron.svg';
import {
    getPaddedMonth,
    getMonthName,
    getPaddedDay,
    getTime,
    getTimeZoneCorrectedDate
} from '../../_helpers/dateFormatter';

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: solid 1px rgba(0, 0, 0, 0.0975);
`;
Header.displayName = 'Header';

const Title = styled.div`
    font-weight: bold;
`;
Title.displayName = 'Title';

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;
LeftColumn.displayName = 'LeftColumn';

const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;
RightColumn.displayName = 'RightColumn';

const Location = styled.div`
    display: flex;
    justify-content: space-between;
`;
Location.displayName = 'Location';

const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
InfoSection.displayName = 'InfoSection';

const NotesSection = styled.div`
    border-left: solid 1px rgba(0, 0, 0, 0.0975);
    border-top: solid 1px rgba(0, 0, 0, 0.0975);
    height: auto;
    padding: 5px;
    font-size: 12px;
`;
NotesSection.displayName = 'NotesSection';

class InterviewCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSelected: false,
            showEditButtons: false
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

    formatDate(value) {
        const options = {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        const valueAsDate = new Date(value);
        return valueAsDate.toLocaleDateString('en-US', options);
    }

    handleDelete(id) {
        const { dispatch } = this.props;
        dispatch(interviewActions.delete(this.props.interview._id));
    }

    renderCard = interview => {
        const {
            startTime,
            location,
            contact,
            followUpSent,
            response,
            offer,
            interviewType,
            round,
            notes,
            _id,
            applicationId
        } = interview;
        const startTimeAsDate = new getTimeZoneCorrectedDate(startTime);
        const { company } = this.props;
        return (
            <React.Fragment>
                <LeftColumn>
                    <Header>
                        <Title>{company}</Title>
                        <div>{`Round ${round}`}</div>
                    </Header>
                    <InfoSection>
                        <div>
                            <Location>
                                <div>{location}</div>
                                <div>{interviewType}</div>
                            </Location>
                            <div>{`Contact: ${contact}`}</div>
                            {response && <div>{response}</div>}
                            {offer !== 0 && <div>{`Offer: ${offer}`}</div>}
                            <div>Notes</div>
                        </div>
                        <NotesSection>{notes}</NotesSection>
                    </InfoSection>
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
                            {!this.state.showEditButtons && <DownChevron />}
                        </div>
                    </div>
                    {this.state.showEditButtons && (
                        <div>
                            <Link
                                to={`applications/${applicationId}/interviews/${_id}`}
                            >
                                <Button>
                                    <EditIcon />
                                </Button>
                            </Link>
                            <Button onClick={this.handleDelete}>
                                <DeleteIcon />
                            </Button>
                        </div>
                    )}{' '}
                    <DateDisplay>
                        <Month>{getMonthName(startTimeAsDate)}</Month>
                        <DateNumber>{getPaddedDay(startTimeAsDate)}</DateNumber>
                        <Time>{getTime(startTime)}</Time>
                    </DateDisplay>
                </RightColumn>
            </React.Fragment>
        );
    };

    render() {
        const { interview } = this.props;
        if (!interview) {
            return null;
        }
        return (
            <CardListItem
                onClick={() =>
                    this.state.showEditButtons &&
                    this.setState({ showEditButtons: false })
                }
                onMouseEnter={() => this.setState({ isSelected: true })}
                onMouseLeave={() =>
                    this.setState({ isSelected: false, showEditButtons: false })
                }
            >
                {this.renderCard(interview)}
            </CardListItem>
        );
    }
}

InterviewCard.propTypes = {
    interview: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    company: PropTypes.string
};

const connectedInterviewCard = connect(null)(InterviewCard);
export { connectedInterviewCard as InterviewCard };

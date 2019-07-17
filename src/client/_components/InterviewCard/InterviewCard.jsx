import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { interviewActions } from '../../_actions';
import { CardListItem, Button } from '../Card.styles';
import {
    DateDisplay,
    DateNumber,
    Month,
    Day,
    Time
} from './InterviewCard.styles';
import { ReactComponent as EditIcon } from '../../_assets/icons8-edit-50.svg';
import { ReactComponent as DeleteIcon } from '../../_assets/icons8-trash-50.svg';
import { ReactComponent as DownChevron } from '../../_assets/down-chevron.svg';

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
    justify-content: space-between;
`;
LeftColumn.displayName = 'LeftColumn';

const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;
RightColumn.displayName = 'RightColumn';

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
        const { company } = this.props;
        return (
            <React.Fragment>
                <LeftColumn>
                    <div>
                        <Header>
                            <Title>{company}</Title>
                            <div>{`round ${round}`}</div>
                        </Header>
                    </div>
                    <div>{location}</div>
                    <div>{interviewType}</div>
                    <div>{`Contact: ${contact}`}</div>
                    <div>{response}</div>
                    <div>{offer ? `Offer: ${offer}` : ''}</div>
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
                        <Month>May</Month>
                        <DateNumber>03</DateNumber>
                        <Time>2:00 PM</Time>
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

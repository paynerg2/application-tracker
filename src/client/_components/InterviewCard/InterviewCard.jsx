import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { interviewActions } from '../../_actions';
import { CardListItem, Button } from '../Card.styles';

class InterviewCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSelected: false
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(id) {
        const { dispatch } = this.props;
        dispatch(interviewActions.delete(this.props.interview._id));
    }

    renderCard = interview => {
        const { startTime, location, _id, applicationId } = interview;
        return (
            <React.Fragment>
                <div>{startTime}</div>
                <div>{location}</div>

                {this.state.isSelected && (
                    <div>
                        <Link
                            to={`applications/${applicationId}/interviews/${_id}`}
                        >
                            <Button>edit</Button>
                        </Link>
                        <Button onClick={this.handleDelete}>Delete</Button>
                    </div>
                )}
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
                onMouseEnter={() => this.setState({ isSelected: true })}
                onMouseLeave={() => this.setState({ isSelected: false })}
            >
                {this.renderCard(interview)}
            </CardListItem>
        );
    }
}

InterviewCard.propTypes = {
    interview: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

const connectedInterviewCard = connect(null)(InterviewCard);
export { connectedInterviewCard as InterviewCard };

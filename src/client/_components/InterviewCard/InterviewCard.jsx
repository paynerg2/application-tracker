import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { interviewActions } from '../../_actions';
import { CardListItem, Button } from '../Card.styles';
import { ReactComponent as EditIcon } from '../../_assets/icons8-edit-50.svg';
import { ReactComponent as DeleteIcon } from '../../_assets/icons8-trash-50.svg';

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
                            <Button>
                                <EditIcon />
                            </Button>
                        </Link>
                        <Button onClick={this.handleDelete}>
                            <DeleteIcon />
                        </Button>
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

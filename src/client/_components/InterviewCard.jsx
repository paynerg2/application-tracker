import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { interviewActions } from '../_actions';

const CardListItem = styled.li`
    /*Adust with media query */
    width: 30%;
    height: 25vh;
    padding: 15px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
    background-color: #fff;
    list-style-type: none;
    margin: 10px;
    display: grid;
    grid-template-columns: 66% auto;
    box-shadow: 1px 2px 6px 1px lightgrey;
    border-radius: 2%;

    &:hover {
        box-shadow: 1px 2px 6px 1px lightblue;
    }
`;

const Button = styled.button`
    border: none;
    padding: 4px 7px 4px 7px;
    background: #ff8500;
    color: #fff;
    margin-top: 5px;
    box-shadow: 1px 1px 4px #dadada;
    -moz-box-shadow: 1px 1px 4px #dadada;
    -webkit-box-shadow: 1px 1px 4px #dadada;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    font-family: 8px Arial, Helvetica, sans-serif;

    &:hover {
        background: #ea7b00;
        color: #fff;
    }
`;

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
        return (
            <CardListItem
                onMouseEnter={() => this.setState({ isSelected: true })}
                onMouseLeave={() => this.setState({ isSelected: false })}
            >
                {this.renderCard(this.props.interview)}
            </CardListItem>
        );
    }
}

const connectedInterviewCard = connect(null)(InterviewCard);
export { connectedInterviewCard as InterviewCard };

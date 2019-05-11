import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { applicationActions } from '../_actions';

export const CardListItem = styled.li`
    /*Adust with media query */
    width: 30%;
    height: 20vh;
    padding: 15px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
    background-color: #fff;
    list-style-type: none;
    margin: 10px;
    display: grid;
    grid-template-columns: 66% auto;
`;

const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Title = styled.div`
    font-weight: bold;
    border-bottom: solid 1px rgba(0, 0, 0, 0.0975);
`;

const Location = styled.div`
    font-style: italic;
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

class ApplicationCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSelected: false
        };

        this.handleSelection = this.handleSelection.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleSelection() {
        this.setState({ isSelected: !this.state.isSelected });
    }

    handleDelete(id) {
        const { dispatch } = this.props;
        dispatch(applicationActions.delete(this.props.application._id));
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
            dateApplicationSent
        } = application;
        return (
            <React.Fragment>
                <LeftColumn>
                    <div>
                        <Title>{jobTitle}</Title>
                        <div>{company}</div>
                    </div>
                    <Location>{location}</Location>
                </LeftColumn>
                <RightColumn>
                    {this.state.isSelected && (
                        <div>
                            <Link to={`/applications/${_id}`}>
                                <Button>edit</Button>
                            </Link>
                            <Button onClick={this.handleDelete}>Delete</Button>
                        </div>
                    )}
                    <div>{mainSkill}</div>
                    <div>{this.formatDate(dateApplicationSent)}</div>
                </RightColumn>
            </React.Fragment>
        );
    };

    render() {
        return (
            <CardListItem
                onClick={this.handleSelection}
                key={this.props.application._id}
            >
                {this.renderCard(this.props.application)}
            </CardListItem>
        );
    }
}

const connectedApplicationCard = connect(null)(ApplicationCard);
export { connectedApplicationCard as ApplicationCard };

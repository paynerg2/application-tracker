import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { applicationActions } from '../_actions';
import { ProgressBar, InterviewList } from '../_components';

export const CardListItem = styled.li`
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

const Bottom = styled.div`
    display: flex;
    width: 100%;
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

const Dropdown = styled.select`
    border: none;
    width: 100px;
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

        this.handleDelete = this.handleDelete.bind(this);
        this.handleResponseUpdate = this.handleResponseUpdate.bind(this);
    }

    handleDelete(id) {
        const { dispatch } = this.props;
        dispatch(applicationActions.delete(this.props.application._id));
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
                    {!(interviews.length > 0) && (
                        <Dropdown
                            value={response}
                            onChange={e => this.handleResponseUpdate(e)}
                        >
                            <option value="No Response">No Response</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Interview">Add Interview</option>
                        </Dropdown>
                    )}
                    <Bottom>
                        <div>
                            {response === 'Interview' && (
                                <InterviewList interviews={interviews} />
                            )}
                            <Button
                                onClick={() =>
                                    this.props.history.push(
                                        `/applications/${_id}/interviews`
                                    )
                                }
                            >
                                +
                            </Button>
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

const connectedApplicationCard = connect(mapStateToProps)(ApplicationCard);
export { connectedApplicationCard as ApplicationCard };

import React, { Component } from 'react';
import styled from 'styled-components';

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

export class ApplicationCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSelected: false
        };

        this.handleSelection = this.handleSelection.bind(this);
    }

    handleSelection() {
        this.setState({ isSelected: !this.state.isSelected });
    }

    renderCard = application => {
        const {
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
                            <div>edit</div>
                            <div>delete</div>
                        </div>
                    )}
                    <div>{mainSkill}</div>
                    <div>{dateApplicationSent}</div>
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

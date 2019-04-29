import React, { Component } from 'react';
import { Header } from './homepage.styles';

export class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <Header>Header</Header>
                <div>Homepage</div>
            </React.Fragment>
        );
    }
}

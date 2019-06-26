import React, { Component } from 'react';
import Chart from 'chart.js';

export class PieChart extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext('2d');

        const config = {
            type: 'doughnut',
            data: this.props.data,
            options: {
                title: {
                    display: true,
                    text: this.props.title,
                    fontSize: 15,
                    fontStyle: 'bold'
                },
                legend: {
                    display: true
                },
                responsive: true
            }
        };

        new Chart(myChartRef, config);
    }

    render() {
        return (
            <div>
                <canvas id="myPieChart" ref={this.chartRef} />
            </div>
        );
    }
}

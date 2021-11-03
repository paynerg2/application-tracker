import React, { Component } from 'react';
import Chart from 'chart.js';

export class LineGraph extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext('2d');

        const config = {
            type: 'line',
            data: this.props.data,
            options: {
                title: {
                    display: true,
                    text: 'Application Submission',
                    fontSize: 15,
                    fontStyle: 'bold'
                },
                legend: {
                    display: false
                },
                responsive: true,
                scales: {
                    xAxes: [
                        {
                            type: 'time',
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Date',
                                fontSize: 15
                            },
                            time: {
                                unit: 'week'
                            },
                            bounds: 'data',
                            distribution: 'linear',
                            ticks: {
                                autoSkip: true
                            }
                        }
                    ],
                    yAxes: [
                        {
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Applications Submitted',
                                fontSize: 15
                            },
                            ticks: {
                                min: 0,
                                stepSize: 1
                            }
                        }
                    ]
                }
            }
        };

        new Chart(myChartRef, config);
    }

    render() {
        return (
            <div>
                <canvas id="myLineGraph" ref={this.chartRef} />
            </div>
        );
    }
}

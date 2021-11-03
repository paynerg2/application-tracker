import React, { Component } from 'react';
import Chart from 'chart.js';

export class ScatterChart extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext('2d');

        const config = {
            type: 'scatter',
            data: this.props.data,
            options: {
                title: {
                    display: true,
                    text: 'Skills Met of Successful Applications',
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
                            scaleLabel: {
                                display: true,
                                labelString: 'Required Skills Met (%)',
                                fontSize: 15
                            },
                            distribution: 'linear',
                            ticks: {
                                min: 0,
                                max: 100,
                                stepSize: 20
                            }
                        }
                    ],
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: 'Additional Skills Met (%)',
                                fontSize: 15
                            },
                            distribution: 'linear',
                            ticks: {
                                min: 0,
                                max: 100,
                                stepSize: 20
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
                <canvas id="myScatterChart" ref={this.chartRef} />
            </div>
        );
    }
}

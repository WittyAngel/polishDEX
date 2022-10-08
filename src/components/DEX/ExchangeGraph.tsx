import { makeStyles, Theme } from '@material-ui/core';
import React, { useState, useEffect, useRef } from 'react';
import ImportExportIcon from '@material-ui/icons/ImportExport';

import './index.css';

const Chart: any = require('chart.js');

const useStyles = makeStyles((theme: Theme) => ({
    exchangeGraphContainer: {
    },
    exchangeIconContainer: {
        fontFamily: 'Roboto, Arial',

        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    graphContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    periodContainer: {
        padding: '5px',
        display: 'inline-block',
        background: '#343432',
        borderRadius: '5px',
        fontSize: '13px',
        margin: '5px'
    },
    coinName: {
        flexBasis: '14%',
        display: 'flex',
        justifyContent: 'space-between',
        opacity: '0.6',
        fontSize: '14px',
        alignItems: 'center'
    },
    time: {
        color: '#db2f27',
        marginLeft: '15px',
        fontSize: '10px',
        fontWeight: 700
    }
}));

export const ChartColors = [
    '#7B67FF',
    '#2610BA',
    '#16BFF3',
    '#006DD8',
    '#40E0D0',
];

const getFormattedData = (
    labels: string[],
    values: Array<string | number>,
) => ({
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: values,
            borderColor: '#ffc765',
        },
    ],
});

const getConfig = (data: any) => ({
    type: 'line',
    data,
    options: {
        scales:
        {
            yAxes: [{
                display: false
            }],
            xAxes: [{
                display: false
            }],

        },
        cutoutPercentage: 65,
        responsive: true,
        legend: {
            display: false,
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js line chart',
            },
        },
    },
});

const ExchangeGraph = () => {
    const chartContainer = useRef(null);
    const classes = useStyles();

    const formattedData = getFormattedData(['M', 'T', 'W', 'T', 'F', 'S', 'S', 'a', 'a', 'a', 'a', 'a', 'a'],
        [100, 101, 102, 102, 102, 102, 103, 102, 103, 104, 105, 103, 104, 105, 102, 105, 106, 105, 102, 105, 106, 104, 103, 104, 105, 105, 105, 106, 104, 104, 104, 104]);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chart(
                chartContainer.current,
                getConfig(formattedData),
            );
        }
    }, [chartContainer, formattedData]);

    return (
        <div className={classes.exchangeGraphContainer}>
            <div className={classes.graphContainer}>
                <div className={classes.coinName}>
                    <span>ETH</span>
                    <ImportExportIcon style={{
                        fontSize: 'large', backgroundColor: '#191919',
                        width: '25px', height: '25px', cursor: 'pointer',
                        transform: 'rotate(90deg)'
                    }} />
                    <span>USDT</span>
                </div>
                <div>
                    <span className={classes.periodContainer}>1Y</span>
                    <span className={classes.periodContainer}>1M</span>
                    <span className={classes.periodContainer}>1W</span>
                    <span className={classes.periodContainer}>3D</span>
                    <span className={classes.periodContainer}>24H</span>
                </div>

            </div>
            <div>
                <span>2498.39</span>
                <span className={classes.time}>9.86 ( Past 24 Hours )</span>
            </div>
            <canvas height="90" ref={chartContainer} />
        </div>
    );
}

export default ExchangeGraph;
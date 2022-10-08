import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import TradingViewWidget, { Themes, BarStyles } from 'react-tradingview-widget';
import CancelIcon from '@material-ui/icons/Cancel';

import { makeStyles, } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: "column"
    },

    icon: {
        color: theme.colors.white,
        background: theme.colors.secondary,
        alignSelf: 'end',
        margin: '5px',
    }

}));

const TradingViewChart = ({ chartDetails, height, remove }: {
    chartDetails: any,
    height: any,
    remove: (val: any) => void
}) => {
    const classes = useStyles();

    const { t } = useTranslation();

    return (
        <div className={classes.container}>
            <CancelIcon className={classes.icon} onClick={() => remove(chartDetails)} />
            <TradingViewWidget
                symbol={`${chartDetails.symbol}`}
                locale="en"
                width="100%"
                height={height}
                theme={Themes.DARK}
            />
        </div>
    )
}

export default TradingViewChart;

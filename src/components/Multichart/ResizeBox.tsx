import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';

import { ResizableBox } from 'react-resizable';
import './index.css';
import TradingViewChart from './TradingViewChart';

const useStyles = makeStyles((theme) => ({
    emptyBox: {
        margin: '15px 10px 10px 10px',
        background: '#575656',
        textAlign: 'center'
    },

    chart: {
        margin: '15px 10px 20px 10px',
        background: '#141722!important',
    },
    title: {
        padding: '20px',
        fontSize:'18px'
    }
}));

interface Props {
    box: any,
    index: any,
    removeHandler: any,
    height?: any,
    width?: any,
    resizable?: any,
    style?: any,
    className?: any
}

const ResizeBox = ({
    box,
    index,
    removeHandler,
    width = 390,
    height = 430,
    resizable = true,
    style = {},
    className }: Props) => {

    const [heightData, setHeight] = useState(height);
    const [widthData, setWidth] = useState(width);
    const classes = useStyles();

    const resizeHandler = (event: any, data: any) => {
        setWidth(data.size.width);
        setHeight(data.size.height);
    }

    return (
        <>
            {resizable ? (
                <ResizableBox
                    width={widthData}
                    height={heightData}
                    onResizeStop={resizeHandler}
                    className={Object.keys(box).length > 1 ? classes.chart : classes.emptyBox}>
                    <div key={box.key} >
                        {Object.keys(box).length > 1 ? <TradingViewChart
                            height={heightData - 25}
                            chartDetails={box}
                            remove={() => removeHandler(box, index)} /> : <p className={classes.title}>Select Token</p>}
                    </div>
                </ResizableBox>
            ) : null}
        </>
    );
}

export default ResizeBox;
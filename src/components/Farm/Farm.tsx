import React, { useEffect, useState } from 'react';

import {
    fade,
    makeStyles,
    Theme,
    withStyles,
    createStyles,
} from '@material-ui/core/styles';
// import { Doughnut } from 'react-chartjs-2';

import DoghnutChart, { ChartColors } from 'components/Charts/Doghnut';

import { useTranslation } from 'react-i18next';

import { Label } from 'components/UI';
import { Button } from '@material-ui/core';
import FarmIcon from "../../assets/tab-nft-active.png";
import FarmDetailsModal from './FarmDetailsModal';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            width: '100%',
            flexDirection: 'column',
            padding: '0 9em',
            display: 'flex',
            marginBottom: '2em',
            flex: 1
        },
        title: {
            color: theme.colors.white,
            fontSize: 24,
            padding: '10px 20px 0px 0px',
            margin: '15px 0px',
        },
        earnContainer: {
            height: '100px',
            background: theme.colors.primary,
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px'
        },
        totalEarned: {
            padding: '10px',
            margin: "0px 10px",
            display: 'flex',
            alignItems: 'center',
        },
        buttonContainer: {
            textAlign: 'center',
            opacity: 0.4,
            color: theme.colors.primary,

        },
        buttonContainerDetails: {
            flexGrow: 1,
            width: '25%',
            textAlign: 'center',
            background: 'black',
            flexBasis: "25%",
            borderRadius: "10px"
        },
        aprContainer: {
            display: 'flex',
            marginTop: '20px',
            justifyContent: 'space-between',
            height: '370px'
        },
        buttonContainerDetailsMiddle: {
            margin: "0px 25px"
        },
        maskTakeButton: {
            backgroundColor: theme.colors.white,
            color: theme.colors.secondary,
            textTransform: 'capitalize',
            padding: '10px 20px',
            marginTop: 10,
            marginRight: 10,
        },
        maskHarvestButton: {
            backgroundColor: theme.colors.secondary,
            color: theme.colors.white,
            textTransform: 'capitalize',
            padding: '10px 35px',
            marginTop: 10,
        },
        viewDetailsButton: {
            backgroundColor: theme.colors.primary,
            color: theme.colors.secondary,
            textTransform: 'capitalize',
            padding: '8px 35px',
        },
        amount: {
            margin: '0px 5px',
            fontWeight: 600,
            fontSize: '22px',
        },
        farmIcon: {
            background: 'black',
            borderRadius: '50px',
            margin: '0px 12px',
            height: '38px',
        },
        text: {
            fontSize: '17px',
            opacity: '0.8',
            marginRight: '5px',
        },
        doghnut: {
            padding: '25px 0px 0px 0px'
        },
    }),
);



const Farm = () => {
    const [respSize, setRespsize] = useState("");
    const isMobile = window.orientation > -1;

    useEffect(() => {
        function handleResize(){
            if(isMobile) {
                setRespsize("16px")
            } else {
                setRespsize("25px")
            }
        }
        handleResize()
    })
    const canvasInnerHead = {
        marginBottom: '5px',
        marginTop: 0,
        fontSize: respSize,
        opacity: '0.9',
        Position: 'relative'
    }
    
    const canvasInnerText = {
        fontSize: respSize,
        opacity: '0.5'
    }
    
    const classes = useStyles();
    const { t } = useTranslation();
    const showInnerText = true;
    const data = {
        allocation: "20.00%",
        apr: "APR"
    }
    const innerData = <div style={{
        marginTop: '-34%',
        marginBottom: '32%',
        color: 'white',
    }}>
        <h1 // style={{
            //     marginBottom: '5px',
            //     marginTop: 0,
            //     fontSize: '25px',
            //     opacity: '0.9',
            //     position: 'relative'
            // }}
            style={canvasInnerHead}
        >{data.allocation}</h1>
        <span 
        // style={{
        //     fontSize: '25px',
        //     opacity: '0.5'
        // }}
        style={canvasInnerText}>{data.apr}</span>
    </div>;

    const innerData2 = <div style={{
        marginTop: '-34%',
        marginBottom: '32%',
        color: 'white',
    }}>
         <h1 // style={{
            //     marginBottom: '5px',
            //     marginTop: 0,
            //     fontSize: '25px',
            //     opacity: '0.9',
            //     position: 'relative'
            // }}
        style={canvasInnerHead}>25.00%</h1>
        <span 
        // style={{
        //     fontSize: '25px',
        //     opacity: '0.5'
        // }}
        style={canvasInnerText}>{data.apr}</span>
    </div>;

    const innerData3 = <div style={{
        marginTop: '-34%',
        marginBottom: '32%',
        color: 'white',
    }}>
        <h1 // style={{
            //     marginBottom: '5px',
            //     marginTop: 0,
            //     fontSize: '25px',
            //     opacity: '0.9',
            //     position: 'relative'
            // }}
        style={canvasInnerHead}>30.00%</h1>
        <span 
        // style={{
        //     fontSize: '25px',
        //     opacity: '0.5'
        // }}
        style={canvasInnerText}>{data.apr}</span>
    </div>;
    const [isReceiveModalOpen, toggleReceiveModal] = useState(false);


    const handleMenuOpen = () => {
        toggleReceiveModal(!isReceiveModalOpen)
    }

    const [apr, setApr] = useState('20.00%');


    return (
        <>
            <FarmDetailsModal apr={apr} isOpen={isReceiveModalOpen} toggleModal={toggleReceiveModal} />
            <div className={classes.wrapper}>
                <Label variant="h2" className={classes.title} text="FARM_HEADER" />
                <div className={classes.earnContainer}>
                    <div className={classes.totalEarned}>
                        <span className={classes.text}>{t('FARM_TOTAL_EARNED')}</span>
                        <img className={classes.farmIcon}
                            src={FarmIcon}
                            alt="secure"
                        />
                        <span className={classes.amount}>0.000</span>
                    </div>
                    <div className={classes.buttonContainer}>
                        <Button className={classes.maskTakeButton}>{t('FARM_MASS_STAKE_APPROVE')}</Button>
                        <Button className={classes.maskHarvestButton}>{t('FARM_MASS_HARVEST')}</Button>
                    </div>
                </div>
                <div className={classes.aprContainer}>
                    <div className={classes.buttonContainerDetails}>
                        <div className={classes.doghnut}>
                            <DoghnutChart
                                values={[1, 2, 4]}
                                labels={['a', 'c', 'd']}
                                innerText={showInnerText}
                                innerData={innerData}
                            />
                        </div>
                        <Button onClick={() => { handleMenuOpen(); setApr('20.00%') }} className={classes.viewDetailsButton}>{t('FARM_VIEW_DETAILS')}</Button>
                    </div>
                    <div className={`${classes.buttonContainerDetails} ${classes.buttonContainerDetailsMiddle}`}>
                        <div className={classes.doghnut}>
                            <DoghnutChart
                                values={[1, 2, 4]}
                                labels={['a', 'c', 'd']}
                                innerText={showInnerText}
                                innerData={innerData2}
                            />
                        </div>
                        <Button onClick={() => { handleMenuOpen(); setApr('25.00%') }} className={classes.viewDetailsButton}>{t('FARM_VIEW_DETAILS')}</Button>
                    </div>
                    <div className={classes.buttonContainerDetails}>
                        <div className={classes.doghnut}>
                            <DoghnutChart
                                values={[1, 2, 4]}
                                labels={['a', 'c', 'd']}
                                innerText={showInnerText}
                                innerData={innerData3}
                            />
                        </div>
                        <Button onClick={() => { handleMenuOpen(); setApr('30.00%') }} className={classes.viewDetailsButton}>{t('FARM_VIEW_DETAILS')}</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Farm;
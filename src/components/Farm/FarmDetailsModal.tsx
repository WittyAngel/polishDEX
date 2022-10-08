import React, { ReactElement } from 'react';
import {
    Label,
    DesktopModal,
} from 'components/UI';

import { Button } from '@material-ui/core';
import DoghnutChart, { ChartColors } from 'components/Charts/Doghnut';

import { useTranslation } from 'react-i18next';
import useStyles from './style';
import FarmIcon from "../../assets/tab-nft-active.png";
import TabHomeIcon from "../../assets/tab-home-active.png";


const FarmDetailsModal = ({
    isOpen,
    toggleModal,
    apr
}: {
    isOpen: boolean;
    toggleModal: any;
    apr: any;
}): ReactElement => {
    const classes = useStyles();
    const { t } = useTranslation();

    const handleFormClose = () => {
        toggleModal(!isOpen);
    };

    return (
        <DesktopModal isVisible={isOpen} handleClose={handleFormClose}>
            <>
                <div className={classes.root}>
                    <div className={classes.donutContainer}>
                        <DoghnutChart
                            style={{ position: 'relative', height: '150px ', width: '131px' }}
                            values={[1, 2, 4]}
                            labels={['a', 'c', 'd']}
                        />
                        <div className={classes.tykContainer}>

                            <div className={classes.labelContainer}>
                                <Label
                                    className={classes.aprTitle}
                                    component="div"
                                    variant="h2"
                                    text="FARM_VIEW_DETAILS_TYK_BNB"
                                />
                                <div className={classes.imageContainer}>
                                    <img className={classes.farmIcon}
                                        src={TabHomeIcon}
                                        alt="secure"
                                    />
                                    <img className={`${classes.farmIcon} ${classes.secondImage}`}
                                        src={FarmIcon}
                                        alt="secure"
                                    />
                                </div>

                            </div>
                            <div style={{ marginTop: "15px" }}>
                                <span className={classes.aprText}>APR:</span>
                                <span className={classes.aprContainer}>{apr}</span>
                            </div>
                        </div>
                    </div>
                    <div className={classes.descContainer}>
                        <div style={{ flexBasis: "55%" }}>
                            <div className={classes.descKey}>0</div>
                            <div className={classes.descValue} >Earned</div>
                        </div>
                        <div>
                            <div className={classes.descKey}>$0.00</div>
                            <div className={classes.descValue}>Liquidity</div>
                        </div>
                    </div>
                    <div className={classes.bonusContainer}>
                        <div className={classes.bonus}>
                            <span className={classes.descValue}>Bonus</span>
                            <span>0x</span>
                        </div>
                        <div className={classes.bonus}>
                            <span className={classes.descValue}>Earn</span>
                            <span>TYK</span>
                        </div>
                        <div className={classes.bonus}>
                            <span className={classes.descValue}>Fee</span>
                            <span>0%</span>
                        </div>
                    </div>
                    <div className={classes.viewDetailsButtonContainer} >
                        <Button className={classes.viewDetailsButton}>Coming Soon</Button>
                    </div>
                </div>
            </>
        </DesktopModal >
    );
};

export default FarmDetailsModal;

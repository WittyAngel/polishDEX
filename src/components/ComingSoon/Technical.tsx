import React, { useEffect, useMemo } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapperContainer: {
            color: theme.colors.primary,
            margin: 'auto',
            textAlign: 'center',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        },
        wrapper: {
            margin: '12% auto',
            maxWidth: '420px',
        },
        TechinicalHeader: {
            color: "#000",
            fontSize: 20,
            opacity: 0.8,
            letterSpacing: '2px',
            fontWeight: 'bold',

        },
        TechinicalText: {
            color: theme.colors.primary,
            fontSize: 55,
            fontWeight: 'bold',
            letterSpacing: '3px',

        },
        soonText: {
            marginTop: "-10px"
        },
        TechinicalDesc1: {
            color: theme.colors.white,
            fontSize: 13,

        },
        TechinicalDesc2: {
            color: theme.colors.white,
            opacity: 0.5,
            fontSize: 11,
            margin: '10px 0px',
        }
    })
)
const Techinical = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    const screenText = useMemo(() => {
        return {
            TechinicalHeader: 'Technical Maintenance',
            comingText: 'Will be back in few hours ',
            soonText: t('SOON_TEXT'),
            TechinicalDesc1: t('COMING_SOON_DESC1'),
            TechinicalDesc2: t('COMING_SOON_DESC2'),
        };
    }, [t]);

    return (
        <div className={classes.wrapperContainer}>
            <div className={classes.wrapper}>
                <div className={classes.TechinicalHeader}>{screenText.TechinicalHeader}</div>
                <div className={classes.TechinicalText}>{screenText.comingText}</div>
                {/* <div className={`${classes.TechinicalText} ${classes.soonText} `}>{screenText.soonText}</div>
                <div className={classes.TechinicalDesc1}>{screenText.TechinicalDesc1}</div>
                <div className={classes.TechinicalDesc2}>{screenText.TechinicalDesc2}</div> */}
            </div>
        </div>
    )
}
export default Techinical
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
        comingSoonHeader: {
            color: theme.colors.white,
            fontSize: 20,
            opacity: 0.8,
            letterSpacing: '2px',
            fontWeight: 'bold',

        },
        comingSoonText: {
            color: theme.colors.primary,
            fontSize: 55,
            fontWeight: 'bold',
            letterSpacing: '3px',

        },
        soonText: {
            marginTop: "-10px"
        },
        comingSoonDesc1: {
            color: theme.colors.white,
            fontSize: 13,

        },
        comingSoonDesc2: {
            color: theme.colors.white,
            opacity: 0.5,
            fontSize: 11,
            margin: '10px 0px',
        }
    })
)
const ComingSoon = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    const screenText = useMemo(() => {
        return {
            comingSoonHeader: t('COMING_SOON_HEADER'),
            comingText: t('COMING_TEXT'),
            soonText: t('SOON_TEXT'),
            comingSoonDesc1: t('COMING_SOON_DESC1'),
            comingSoonDesc2: t('COMING_SOON_DESC2'),
        };
    }, [t]);

    return (
        <div className={classes.wrapperContainer}>
            <div className={classes.wrapper}>
                <div className={classes.comingSoonHeader}>{screenText.comingSoonHeader}</div>
                <div className={classes.comingSoonText}>{screenText.comingText}</div>
                <div className={`${classes.comingSoonText} ${classes.soonText} `}>{screenText.soonText}</div>
                <div className={classes.comingSoonDesc1}>{screenText.comingSoonDesc1}</div>
                <div className={classes.comingSoonDesc2}>{screenText.comingSoonDesc2}</div>
            </div>
        </div>
    )
}
export default ComingSoon
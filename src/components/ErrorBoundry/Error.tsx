import React, { useEffect, useMemo } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapperContainer: {
            color: theme.colors.primary,
            margin: 'auto',
            textAlign: 'center',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.darkGray,
            height: '100vh'
        },
        wrapper: {
            margin: '12% auto',
            maxWidth: '420px',
        },
        errorHeader: {
            color: theme.colors.white,
            fontSize: 20,
            opacity: 0.8,
            letterSpacing: '2px',
            fontWeight: 'bold',

        },
        errorText: {
            color: theme.colors.primary,
            fontSize: 55,
            fontWeight: 'bold',
            letterSpacing: '3px',

        },
        soonText: {
            marginTop: "-10px"
        },
        errorDesc1: {
            color: theme.colors.white,
            fontSize: 13,

        },
        errorDesc2: {
            color: theme.colors.white,
            opacity: 0.5,
            fontSize: 11,
            margin: '10px 0px',
        },
        btnReturn: {
            backgroundColor: theme.colors.primary,
            fontSize: 14,
            padding: 10,
            marginTop: 20
        }
    })
)
const Error = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const history = useHistory();

    const screenText = useMemo(() => {
        return {
            errorHeader: t('ERROR_HEADER'),
            errorText: t('ERROR_TEXT'),
            errorDesc1: t('ERROR_DESC1'),
            errorDesc2: t('ERROR_DESC2'),
        };
    }, [t]);

    const returnToDashboard = () => {
        history.replace('/dashboard');
        history.go(0);
    }

    return (
        <div className={classes.wrapperContainer}>
            <div className={classes.wrapper}>
                <div className={classes.errorHeader}>{screenText.errorHeader}</div>
                <div className={classes.errorText}>{screenText.errorText}</div>
                <div className={classes.errorDesc1}>{screenText.errorDesc1}</div>
                <div className={classes.errorDesc2}>{screenText.errorDesc2}</div>
                <Button className={classes.btnReturn} onClick={returnToDashboard}>Return To Dashboard</Button>
            </div>
        </div>
    )
}
export default Error;
import React, { ReactElement, useState } from 'react';
import {
    Label,
    DesktopModal,
    InputField,
} from 'components/UI';
import { Button, makeStyles } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: theme.colors.secondary,
        color: theme.colors.white,
        padding: 30,
        maxWidth: 476,
        minWidth: 450,
        maxHeight: 575,
        overflowY: 'auto',
        textAlign: 'center'

    },
    wallet: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.secondary,
        textTransform: 'capitalize',
        padding: '7px 150px',
        // marginTop: 10,
    },
    header: {
        margin: '0px 14px 15px 5px'
    },
    headerDesc: {
        margin: '10px 5px',
        fontSize: '13px',
        opacity: '0.9'
    },
    inputBox: {
        margin: '20px 5px',
        display: "flex",
        alignItems: 'center',
        background: '#191919 !important',
        marginTop: '5px',

    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        margin: '20px 5px 0px 5px',
        color: theme.colors.white,

    },
    cancleButton: {
        backgroundColor: theme.colors.secondary,
        color: theme.colors.white,
        border: '1px solid #6f6a6a'
    },
    input: {
        flex: 1, backgroundColor: "#7775755a  !important",
        border: 'none',
        padding: '10px',
        borderRadius: '2px',
        color: theme.colors.white,
        outline: 0
    },
    visibility: {
        color: theme.colors.white,
        background: '#7775755a ',
        borderRadius: '0px',
        padding: '6px 12px',
    },
    adorment: {
        height: '44px',
        width: '50px',
        margin: '0px',
    },
    passwordText: {
        fontSize: '13px',
        opacity: "0.9",
        marginLeft: '5px'

    },
    icon: {
        fontSize: '55px',
        margin: '10px',
        color: '#40cb40'
    },
    closeIcon: {
        fontSize: '55px',
        margin: '10px',
        color: 'red'
    }
}));


const SuccessSwap = ({
    isOpen,
    setShowModal,
    message,
    error
}: {
    isOpen: boolean;
    setShowModal: any;
    message: any,
    error: boolean;
}): ReactElement => {
    const classes = useStyles();

    const { t } = useTranslation();
    const showCancelBtn = false;
    const handleFormClose = () => {
        setShowModal(!isOpen)
    };

    return (
        <DesktopModal isVisible={isOpen} handleClose={handleFormClose} showCancelBtn={showCancelBtn}>
            <div className={classes.root}>
                {!error ? <CheckCircleIcon className={classes.icon} /> :
                    <CloseIcon className={classes.closeIcon} />}
                <Label className={classes.header}
                    component="div"
                    variant="h2"
                    text={message}
                />
                <div className={classes.buttonContainer}>
                    <Button className={classes.wallet} onClick={handleFormClose}>
                        Close
                    </Button>
                </div>
            </div>
        </DesktopModal>
    );
};

export default SuccessSwap;

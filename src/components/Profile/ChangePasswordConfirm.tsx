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

    },
    wallet: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.secondary,
        textTransform: 'capitalize',
        padding: '7px 72px',
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

    }
}));


const ChangePasswordConfirm = ({
    isOpen,
    setShowModalConfirmHandler
}: {
    isOpen: boolean;
    setShowModalConfirmHandler: any;
}): ReactElement => {
    const classes = useStyles();
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();
    const showCancelBtn = false;
    const handleFormClose = () => {
    };

    return (
        <DesktopModal isVisible={isOpen} handleClose={handleFormClose} showCancelBtn={showCancelBtn}>
            <div className={classes.root}>
                <Label className={classes.header}
                    component="div"
                    variant="h2"
                    text="PROFILE_HEADER_CONFIRM"
                />
                <div className={classes.headerDesc}>
                    Create a new password  to secure your account. Please do not reuse your old password.
                </div>
                <div>
                    <span className={classes.passwordText}>New Password</span>
                    <div className={classes.inputBox}>
                        <input className={classes.input}
                            type={showPassword ? 'text' : 'password'}
                            placeholder={t("PROFILE_NEW_PASSWORD")}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        < InputAdornment position="end" className={classes.adorment}>
                            <IconButton className={classes.visibility}
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    </div>
                </div>
                <div>
                    <span className={classes.passwordText}>Confirm Password</span>
                    <div className={classes.inputBox}>
                        <input className={classes.input}
                            type={showPassword ? 'text' : 'password'}
                            placeholder={t("PROFILE_CONFIRM_PASSWORD")}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        < InputAdornment position="end" className={classes.adorment}>
                            <IconButton className={classes.visibility}
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    </div>
                </div>
                <div className={classes.buttonContainer}>
                   
                    <Button className={classes.wallet} onClick={setShowModalConfirmHandler}>
                        Change Password
                    </Button>
                </div>
            </div>
        </DesktopModal>
    );
};

export default ChangePasswordConfirm;

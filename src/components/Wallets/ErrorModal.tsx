import React, { ReactElement } from 'react';
import {
    Label,
    DesktopModal,
} from 'components/UI';
import { Button, makeStyles } from '@material-ui/core';

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

    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        margin: '20px 5px 0px 5px',
        color: theme.colors.white,

    },
    icon: {
        fontSize: '55px',
        margin: '10px',
        color: '#40cb40'
    }
}));



const ErrorModal = ({
    isOpen,
    toggleModal
}: {
    isOpen: boolean;
    toggleModal: any;

}): ReactElement => {
    const classes = useStyles();
    const { t } = useTranslation();

    const handleFormClose = () => {
        toggleModal(!isOpen);
    };

    return (
        <DesktopModal isVisible={isOpen} handleClose={handleFormClose}>
            <div className={classes.root}>
                <Label className={classes.header}
                    component="div"
                    variant="h2"
                    text={t('ERROR')}
                />
                <div className={classes.headerDesc}>
                    {t('TRY_AGAIN_LATER')}
                </div>


                <div className={classes.buttonContainer}>
                    <Button className={classes.wallet} >
                        {t('CLOSE')}
                    </Button>
                </div>
            </div>
        </DesktopModal>
    );
};

export default ErrorModal;

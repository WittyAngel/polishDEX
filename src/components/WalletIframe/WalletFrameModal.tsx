import React, { ReactElement, useRef } from 'react';
import {
    Label,
    DesktopModal,
} from 'components/UI';
import { Button, IconButton, Avatar } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import { Link, useHistory } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import FarmIcon from "../../assets/tab-nft-active.png";


import useStyles from './style';


const WalletFrameModal = ({
    isOpen,
    toggleModal,
    showCancelBtn = true
}: {
    isOpen: boolean;
    toggleModal: any;
    showCancelBtn?: boolean;
}): ReactElement => {
    const classes = useStyles();
    const { t } = useTranslation();


    const history = useHistory();

    const backHandler = () => {
        toggleModal();
        localStorage.setItem("selectedRoute", 'dashboard');
        history.push('/dashboard')
    }

    const handleFormClose = () => {
        toggleModal();
        localStorage.setItem("selectedRoute", 'dashboard');
        history.push('/dashboard')
    };

    const iframeRef: { current: any } = useRef({
        current: {},
    });

    const onIframeLoad = () => {
        const ifrm = iframeRef.current;
        const iframeWindow = ifrm.contentWindow;
        iframeWindow.postMessage({ selectedLang: localStorage.getItem('i18nextLng') }, 'https://goofy-brown-ac84e3.netlify.app');
    };


    return (
        <Modal
            open={isOpen}
            onClose={handleFormClose}
            className={classes.modalContainer}
            closeAfterTransition
        >
            <div className={clsx(classes.modalWrapper)}>
                <div className={classes.appBar} tabIndex={0} onClick={backHandler} role="button" onKeyDown={backHandler}>
                    <img
                        className={classes.logo}
                        src={FarmIcon}
                        alt="secure"
                    />
                    <span className={classes.text} >KRYPTO</span>
                </div>
                {showCancelBtn ? (
                    <IconButton
                        color="default"
                        onClick={handleFormClose}
                        className={classes.cancelBtn}
                        title={t('CANCEL_BTN')}
                    >
                        <CancelIcon />
                    </IconButton>
                ) : null}            <>
                    <div className={classes.root}>
                        <iframe ref={iframeRef} title='iframe' onLoad={onIframeLoad} width="100%" height="100%" src="https://goofy-brown-ac84e3.netlify.app/" frameBorder="0" allowFullScreen />
                    </div>
                </>
            </div>
        </Modal>);
};

export default WalletFrameModal;

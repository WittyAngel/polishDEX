import React, { useCallback, useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AddressContext, useAddressContext } from 'context/AddressContext';

import { Avatar } from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import walletType from '../../assets/banner-faq.png';

const useStyles = makeStyles((theme: Theme) => ({
    initialsWrapper: {
        width: '15rem',
        height: '3.125rem',
        borderRadius: '0.3125rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        margin: '10px',
        '&:hover': {
            backgroundColor: theme.colors.dropdownColor
        },
        '&.selected': {
            backgroundColor: theme.colors.dropdownColor
        }
    },
    initials: {
        '&:hover $dropdown': {
            visibility: 'visible',
        },
        backgroundColor: theme.colors.cornflowerblue,
    },
    dropdownIcon: {
        fill: theme.colors.white,
    },
    userName: {
        color: theme.colors.white,
        textTransform: 'capitalize',
        marginLeft: "10px"
    },
    addressDetails: {
        display: "flex",
        alignItems: "center",
        flex: "1",
        overflow: 'hidden',
    },
    userNameDetails: {
        color: theme.colors.white,
        whiteSpace: "nowrap",
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
}));
interface Props {
    addressWallet: string
}
const AccountMenu = ({ addressWallet }: Props) => {
    const anchorEl = useRef<HTMLDivElement>(null);
    const { isAddressAvailable, setIsAddressAvailable } = useAddressContext();
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const handleMenuOpen = useCallback(() => setIsOpen(prevState => !prevState), [setIsOpen]);

    const handleMenuClose = useCallback((item: any) => setIsOpen(false), [setIsOpen]);

    const classes = useStyles();

    const tykloAddress = localStorage.getItem("tykloAddress");
    const metamaskAddress = localStorage.getItem("metamaskAddress");
    const USER_NAV = [
        {
            name: 'Metamask',
            defaultImg: require('assets/icon-metamask.png'),
            hoverImg: require('assets/tab-setting-inactive.png'),
            route: metamaskAddress && metamaskAddress !== "" ? '/wallet/metamask' : '/wallet/metamask',
        },
        {
            name: 'KRYPTO Wallet',
            defaultImg: require('assets/main-logo.png'),
            hoverImg: require('assets/tab-setting-inactive.png'),
            route: tykloAddress && tykloAddress !== "" ? '/wallet/details' : "/wallet/tyklo",
        }

    ];

    const onClickWallet = (event: any, navigationObject: any) => {
        localStorage.setItem("selectedRoute", 'wallet');
        setIsAddressAvailable(navigationObject.name);
        localStorage.setItem("selectedWallet", navigationObject.name);
        const selectedWallet = localStorage.getItem("selectedWallet");

        if (selectedWallet === "KRYPTO Wallet") {
            history.push(USER_NAV[1].route);
        } else {
            history.push(USER_NAV[0].route);
        }
    }

    return (
        <>
            <div
                className={clsx(classes.initialsWrapper, isOpen && 'selected')}
                ref={anchorEl}
                onMouseDown={handleMenuOpen}
                aria-hidden="true"
            >
                <div className={classes.addressDetails}>
                    <Avatar src={walletType} />
                    <div className={classes.userNameDetails}>
                        <span className={classes.userName}>Account 1</span>
                        <span>( {addressWallet.substr(0, 9)}...
                            {addressWallet.substr(-7)} )</span>
                    </div>
                </div>
                <ArrowDropDownIcon className={classes.dropdownIcon} />
                <DropdownMenu
                    onClickWallet={onClickWallet}
                    open={isOpen}
                    onClose={handleMenuClose}
                    navs={USER_NAV}
                    anchorEl={anchorEl.current}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                />
            </div>
        </>
    )
}

export default AccountMenu;
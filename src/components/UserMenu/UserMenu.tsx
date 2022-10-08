/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from '@material-ui/core/styles';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
// import { USER_NAV } from './config';

import { useAuthenticationContext } from '../../context/AuthenticationContext';
import { IS_USER_LOGGED_IN } from '../../constants/config';

const Moralis = require('moralis');

const useStyles = makeStyles((theme) => ({
  initialsWrapper: {
    width: '4.875rem',
    height: '3.125rem',
    borderRadius: '0.3125rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    textTransform: 'capitalize',
  }
}));

const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

const UserMenu = ({ currentUser }: { currentUser: any }) => {
  const anchorEl = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleMenuOpen = useCallback(() => setOpen(prevState => !prevState), [setOpen]);
  const handleMenuClose = useCallback(() => setOpen(false), [setOpen]);

  const classes = useStyles();

  const history = useHistory();

  const { setIsAuthenticated, isAuthenticated } = useAuthenticationContext();

  const logout = async () => {
    setIsAuthenticated(false);
    localStorage.setItem(IS_USER_LOGGED_IN, 'false');
    localStorage.setItem('selectedWallet', '');
    localStorage.setItem('metamaskAddress', '');
    localStorage.setItem('metamaskChainId', '');
    localStorage.setItem('tykloAddress', '');
    localStorage.setItem("localSelctedWalletType", '');
    localStorage.setItem("selectedRoute", 'dashboard');
    history.push("/")
    await Moralis.User.logOut();
  };

  const USER_NAV = [
    {
      name: t('MENU_PROFILE'),
      defaultImg: require('assets/tab-setting-active.png'),
      hoverImg: require('assets/tab-setting-inactive.png'),
      route: '/profile',
    },
    {
      name: t('MENU_SETTINGS'),
      defaultImg: require('assets/tab-setting-active.png'),
      hoverImg: require('assets/tab-setting-inactive.png'),
      route: '/setting',
    },
    {
      name: t('MENU_LOGOUT'),
      clickMethod: logout,
    },
  ];
  
  // TODO : Need to check why its breaking
  // let initials = currentUser
  //   ? [...currentUser?.attributes?.name?.matchAll(rgx)] || []
  //   : [];

  // initials = (
  //   (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
  // ).toUpperCase();

  return (
    <div
      className={clsx(classes.initialsWrapper, isOpen && 'selected')}
      ref={anchorEl}
      onMouseDown={handleMenuOpen}
    >
      <Avatar classes={{ colorDefault: classes.initials }}>
        {/* <span className={classes.userName}>{initials}</span> */}
      </Avatar>
      <ArrowDropDownIcon className={classes.dropdownIcon} />
      <DropdownMenu
        open={isOpen}
        onClose={handleMenuClose}
        navs={USER_NAV}
        anchorEl={anchorEl.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      />
    </div>
  );
};

export default UserMenu;

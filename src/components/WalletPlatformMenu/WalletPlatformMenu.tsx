import React, { useCallback, useRef, useState, useContext } from 'react';
import { WalletPlatformContext } from 'context/WalletPlatformContext';
import { makeStyles } from '@material-ui/core/styles';
import { setPlatform } from 'redux/actions';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DropdownMenu from "components/DropdownMenu/DropdownMenu";
import clsx from 'clsx';
import { Platform, PLATFORM_ITEMS } from 'constants/tokens';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/types';
import { changeNetwork } from 'components/Wallets/metamask';

const useStyles = makeStyles((theme) => ({
  initialsWrapper: {
    width: '15rem',
    height: '2.8rem',
    borderRadius: '0.3125rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    background: '#282929',
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
    marginLeft: "15px"
  },
  addressDetails: {
    display: "flex",
    alignItems: "center",
    flex: "1",
    overflow: 'hidden',
    color: theme.colors.white,
    padding: "20px"
  },
  userNameDetails: {
    color: theme.colors.white,
    whiteSpace: "nowrap",
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  iconContainer: {
    height: '30px',
    width: '30px'
  }
}));

const WalletPlatformMenu = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const anchorEl = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleMenuOpen = useCallback(() => setIsOpen(prevState => !prevState), [setIsOpen]);
  const selectedPlatform = useSelector((state: RootState) => state.main.platform);
  const { SetSelectedPlatform } = useContext<any>(WalletPlatformContext);

  const handleMenuClose = (item: Platform) => {
    dispatch(setPlatform(item));
    SetSelectedPlatform(item);
    setIsOpen(false);
    changeNetwork(item.chain);
  };

  return (
    <div
      className={clsx(classes.initialsWrapper, isOpen && 'selected')}
      ref={anchorEl}
      onMouseDown={handleMenuOpen}
      aria-hidden="true"
    >
      <div className={classes.addressDetails}>
        <img className={classes.iconContainer} alt="logourl" src={selectedPlatform.defaultImg.default} />
        <span className={classes.userName}>{selectedPlatform.name}</span>
      </div>
      <ArrowDropDownIcon className={classes.dropdownIcon} />
      <DropdownMenu
        open={isOpen}
        onClose={handleMenuClose}
        navs={PLATFORM_ITEMS}
        anchorEl={anchorEl.current}
        isPlatformWallet
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
  )
}

export default WalletPlatformMenu;
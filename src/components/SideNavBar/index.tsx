import React, { useEffect, useState, useContext } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Drawer, Tooltip, useTheme } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';


import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';


import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Link, useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import WalletFrameModal from 'components/WalletIframe/WalletFrameModal';
import { useTranslation } from 'react-i18next';
import { useAuthenticationContext } from 'context/AuthenticationContext';
import { AddressContext, useAddressContext } from 'context/AddressContext';
import { WalletPlatformContext } from 'context/WalletPlatformContext';
import Profile from 'components/Profile/Profile';

import LockIcon from "../../assets/tab-lock.png";

const drawerWidth = 240;

declare let window: any;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
      background: theme.colors.secondary,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    toolbar: theme.mixins.toolbar,
    logoWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      borderBottom: `1px solid ${theme.colors.inputBorder}`,
    },
    closeMenuButton: {
      marginRight: 'auto',
      marginLeft: 0,
    },
    listItemText: {
      marginLeft: 16,
      marginRight: 16,
    },
    listItem: {
      marginLeft: 0,
      marginRight: 0,
      color: theme.colors.white,
      paddingRight: '15px',
    },
    active: {
      background: theme.colors.secondary,
      borderRight: `3px solid ${theme.colors.primary}`,
    },
    icon: {
      height: 32,
      width: 30,
    },
    avatarRoot: {
      minWidth: 30,
    },
    logo: {
      width: 160,
      height: 160,
      marginBottom: 10,
    },
    list: {
      marginTop: 10,
      color: theme.colors.white,
    },
    lockIcon: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      right: '20px',
    },
    privacyPolicy: {
      alignItems: "center",
      color: "white",
      flex: '1',
      display: 'flex',
      flexDirection: 'column-reverse',
    },
    privacy: {
      fontSize: '12px',
      opacity: 0.8,
      margin: '9%'
    },

    dot: {
      fontSize: '10px',
      margin: '0px 10px',
      opacity: '0.8',
    },
    subcategory: {
      borderLeft: '1px solid #787676',
      marginLeft: '30px',
      paddingLeft: '15px',
    },
    listItemCategoryText: {
      fontSize: '13px !important',
      fontFamily: ' Roboto, Arial',
      fontWeight: 600,
      lineHeight: 'normal',
      letterSpacing: 0,
      textTransform: 'none',
      cursor: "pointer"
    },
    listItemCategoryButton: {
      background: 'none',
      color: 'inherit',
      border: 'none',
      padding: 0,
      font: 'inherit',
      cursor: 'pointer',
      outline: 'inherit'
    },
    activeSubMenu: {
      color: theme.colors.primary,
    },
    walletContainer: {
      height: '100%',
      width: '100%',
      background: 'aquamarine',
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0
    }
  }),
);

const selectedWalllet = localStorage.getItem('selectedWallet');

const walletAddress: string = localStorage.getItem("address")!;
let walletRoute = walletAddress && walletAddress !== "" ? "/wallet/details" : "/wallet";

const Categories = [
  {
    key: 'dashboard',
    label: 'SIDENAV_DASHBOARD',
    route: '/dashboard',
    activeIcon: require('assets/tab-home-active.png'),
    inactiveIcon: require('assets/tab-home-inactive.png'),
    isProtected: false,
  },
  // {
  //   key: 'wallet',
  //   label: 'SIDENAV_WALLET',
  //   route: walletRoute,
  //   activeIcon: require('assets/tab-wallet-active.png'),
  //   inactiveIcon: require('assets/tab-wallet-inactive.png'),
  //   isProtected: true,
  //   issubMenuOpen: false,
  //   sideBarItems: [
  //     {
  //       label: 'WALLET_METAMASK_SUBMENU',
  //       route: "/wallet/details",
  //     },
  //     {
  //       label: 'WALLET_TYKLO_SUBMENU',
  //       route: 'wallet',
  //     },
  //   ]
  // },
  {
    key: 'gateway',
    label: 'SIDENAV_FIAT_GATEWAY',
    route: '/fiat-gateway',
    activeIcon: require('assets/tab-fiat-active.png'),
    inactiveIcon: require('assets/tab-fiat-inactive.png'),
    isProtected: true,
  },
  {
    key: 'dex',
    label: 'SIDENAV_DEX',
    route: '/dex',
    activeIcon: require('assets/tab-dex-active.png'),
    inactiveIcon: require('assets/tab-dex-inactive.png'),
    isProtected: true,
  },
  // {
  //   key: 'multichart',
  //   label: 'MULTICHART',
  //   route: '/multichart',
  //   activeIcon: require('assets/tab-dex-active.png'),
  //   inactiveIcon: require('assets/tab-dex-inactive.png'),
  //   isProtected: true,
  // },
  {
    key: 'fark',
    label: 'SIDENAV_FARM',
    route: '/farm',
    activeIcon: require('assets/tab-farm-active.png'),
    inactiveIcon: require('assets/tab-farm-inactive.png'),
    isProtected: false,
  },
  {
    key: 'referral',
    label: 'SIDENAV_REFERRAL',
    route: '/referral',
    activeIcon: require('assets/tab-referral-active.png'),
    inactiveIcon: require('assets/tab-referral-inactive.png'),
    isProtected: true,
  },
  // {
  //   key: 'faq',
  //   label: 'SIDENAV_FAQ',
  //   route: '/faq',
  //   activeIcon: require('assets/tab-faq-active.png'),
  //   inactiveIcon: require('assets/tab-faq-inactive.png'),
  //   isProtected: false,
  // },
  {
    key: 'setting',
    label: 'SIDENAV_SETTING',
    route: '/setting',
    activeIcon: require('assets/tab-setting-active.png'),
    inactiveIcon: require('assets/tab-setting-inactive.png'),
    isProtected: true,
  },
];

const DrawerList = () => {
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [activeSubMenu, setActiveSubMenu] = useState('');
  const { isAddressAvailable, setIsAddressAvailable } = useAddressContext();

  const [categoryList, setCategoryList] = useState<any>(Categories);
  const { SetEnableWalletPlatform } = useContext<any>(WalletPlatformContext);

  const redirectTo = (route: string, key: string, category: any, index: any) => {
    setActiveSubMenu('');
    if (key === 'dex') {
      const selectedMenu = localStorage.getItem('selectedRoute');
      setActiveMenu(selectedMenu!);
      SetEnableWalletPlatform(true)
    } else {
      SetEnableWalletPlatform(false);
    }

    if (category.sideBarItems && category.sideBarItems.length) {
      const selectedCategory: any = categoryList.find((categoryData: any, indexData: any) => {
        return indexData === index
      });
      selectedCategory.issubMenuOpen = !selectedCategory.issubMenuOpen;
      const categoryListClone = [...categoryList];
      categoryListClone[index] = selectedCategory;
      setCategoryList(categoryListClone);
      localStorage.setItem("selectedRoute", key);

      const selectedMenu = localStorage.getItem('selectedRoute');
      setActiveMenu(selectedMenu!);
      return
    }

    localStorage.setItem("selectedRoute", key);
    setActiveMenu(key);
    history.push(route);
    const selectedMenu = localStorage.getItem('selectedRoute');
    setActiveMenu(selectedMenu!);
    setIsAddressAvailable(true);
  };

  const subcategoryHandler = (route: string, key: string, category: any, index: any) => {
    setActiveSubMenu('')

    if (route === "/wallet/details") {
      localStorage.setItem('selectedWallet', 'Metamask')
      setActiveSubMenu('/wallet/details')
      if (window.web3 || window.ethereum) {
        localStorage.setItem('selectedWallet', 'Metamask');
        history.push("/wallet/metamask");
      } else {
        window.open("https://metamask.io/", "_blank")
      }
    }

    if (route === 'wallet') {
      setActiveSubMenu('wallet')

      // setIframeWalletModal(true);
      history.push({
        pathname: '/wallet/tyklo',
      });
      // history.push({
      //   pathname: `/wallet`,
      // });
      // const win: any = window.open();
      // win.document.write('<iframe width="100%" height="100%" src="http://localhost:3000" frameborder="0" allowfullscreen></iframe>');
      return;
    }
    localStorage.setItem("selectedRoute", key);
    setActiveMenu(key);
    history.push(route);
    const selectedMenu = localStorage.getItem('selectedRoute');
    setActiveMenu(selectedMenu!);
    setIsAddressAvailable(true);
  }
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      localStorage.setItem("selectedRoute", 'dashboard');
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    walletRoute = walletAddress && walletAddress !== "" ? "/wallet/details" : "/wallet";
  })

  useEffect(() => {
    if (localStorage.getItem("selectedWallet")! === "Metamask") {
      const metamaskAddress = localStorage.getItem("metamaskAddress")!;
      walletRoute = metamaskAddress && metamaskAddress !== "" ? "/wallet/details" : "/wallet"
    } else if (localStorage.getItem("selectedWallet")! === "KRYPTO Wallet") {
      const metamaskAddress = localStorage.getItem("tykloAddress")!;
      walletRoute = metamaskAddress && metamaskAddress !== "" ? "/wallet/details" : "/wallet"
    }
    const selectedMenu = localStorage.getItem('selectedRoute');
    setActiveMenu(selectedMenu!);
    // eslint-disable-next-line
  }, [localStorage.getItem("selectedWallet")!,
  localStorage.getItem("metamaskAddress")!,
  localStorage.getItem("tykloAddress")!,
  localStorage.getItem("selectedRoute")])

  const { isAuthenticated } = useAuthenticationContext();

  const tooltipMessage = t('LOCK_SCREEN_TOOLTIP');
  const lockTooltip = <h2>{tooltipMessage}</h2>;

  const [iframeWalletModal, setIframeWalletModal] = useState(false);
  return (
    <>
      <div className={classes.list}>
        <WalletFrameModal isOpen={iframeWalletModal} toggleModal={setIframeWalletModal} />
        <List>
          {categoryList.map((category: any, index: any) => (
            <li key={category.key} style={{ position: "relative" }}>
              <ListItem
                button
                key={category.label}
                onClick={() => redirectTo(category.route, category.key, category, index)}
                className={clsx(
                  classes.listItem,
                  activeMenu === category.key ? classes.active : '',
                )}
                disabled={category.isProtected && !isAuthenticated}
              >
                <ListItemAvatar classes={{ root: classes.avatarRoot }}>
                  <img
                    className={classes.icon}
                    src={
                      activeMenu === category.key
                        ? category.activeIcon.default
                        : category.inactiveIcon.default
                    }
                    alt="secure"
                  />
                </ListItemAvatar>
                <ListItemText
                  className={classes.listItemText}
                  primary={t(category.label)}
                />

                {category?.sideBarItems && !category?.issubMenuOpen && category?.sideBarItems.length ? <ArrowDropDownIcon /> : null}
                {category?.issubMenuOpen ? <ArrowDropUpIcon /> : null}


                {category.sideBarItems && category.sideBarItems?.length ? <button style={{ display: 'none' }} type='button'>subCategory</button> : null}
              </ListItem>
              <div className={classes.subcategory}>
                {
                  category.issubMenuOpen ? category.sideBarItems.map((subCategory: any) => (

                    <li key={subCategory.label}>
                      <ListItem>
                        <span className={classes.listItemCategoryText}>
                          <button

                            className={`${classes.listItemCategoryButton}  ${subCategory.route === activeSubMenu ? classes.activeSubMenu : null} `}
                            type='button'
                            onClick={() => subcategoryHandler(subCategory.route, category.key, category, index)}
                          > {t(subCategory.label)}</button> </span>
                      </ListItem>
                    </li>

                  )) : null
                }
              </div>

              {category.isProtected && !isAuthenticated && <Tooltip arrow title={lockTooltip} placement="right-start">
                <img src={LockIcon} alt="lock icon" className={classes.lockIcon} />
              </Tooltip>}
            </li>
          ))}
        </List>
      </div>
      <div className={classes.privacyPolicy}>
        <div className={classes.privacy}>
          <Link style={{color: "#fff", textDecoration: "none"}} to="/privacy">{t('FOOTER_PRIVACY')}</Link><span className={classes.dot}>●</span> {t('FOOTER_TERMS')}
        </div>
      </div>
    </>
  );
};

export default function Home({
  mobileOpen,
  handleDrawerToggle,
}: {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            className={classes.closeMenuButton}
          >
            <CloseIcon />
          </IconButton>
          <DrawerList />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={clsx(classes.toolbar, classes.logoWrapper)}>
            <ListItemAvatar>
              <img
                className={classes.logo}
                src={require('assets/main-logo.png').default}
                alt="secure"
              />
            </ListItemAvatar>
          </div>
          <DrawerList />
        </Drawer>
      </Hidden>
    </nav>
  );
}

import React, { useEffect } from 'react';
import './App.css';
import { StatementContextProvider } from 'context/StatementContext';
import { BSCStatementContextProvider } from 'context/BSCStatementContext';
import { AuthenticationContextProvider } from 'context/AuthenticationContext';
import { AddressContextProvider } from 'context/AddressContext';
import { WalletPlatformProvider } from 'context/WalletPlatformContext';

import {
  CssBaseline,
  makeStyles,
  createStyles,
  Theme,
  Container,
} from '@material-ui/core';
import AppLanguage from 'components/Language';
import Header from './Header';
import SideNavBar from './SideNavBar';
import Routes from '../routes';
import TykloKeyContextProvider from './Wallets/TykloKeyContext';
import Footer from './Footer';

const Moralis = require('moralis');

Moralis.initialize("els7xOpoxkJnsBqiUejRJkYxPfZfi1Y19F6Z8RHZ");
Moralis.serverURL = "https://c2qemm0jqfwh.moralis.io:2053/server";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      minHeight: '100vh',
      height: '100%',
    },
    layout: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      backgroundColor: theme.colors.darkGray,
    },
    sidebar: {
      position: "sticky",
      // zIndex: 1
    },

  }),
);

function App() {
  const { root, layout, sidebar } = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  return (
    <StatementContextProvider>
      <BSCStatementContextProvider>
        <AuthenticationContextProvider>
          <TykloKeyContextProvider>
            <AddressContextProvider>
              <WalletPlatformProvider>
                <div>
                  <div className={root}>
                    <CssBaseline />
                    <AppLanguage />
                    <div className={sidebar}>
                      <SideNavBar
                        mobileOpen={mobileOpen}
                        handleDrawerToggle={handleDrawerToggle}
                      />
                    </div>
                    <div className={layout}>
                      <Header handleDrawerToggle={handleDrawerToggle} />
                      <Routes />
                      <div>
                        <Footer />
                      </div>
                    </div>
                  </div>
                </div>
              </WalletPlatformProvider>
            </AddressContextProvider>
          </TykloKeyContextProvider>
        </AuthenticationContextProvider>
      </BSCStatementContextProvider>
    </StatementContextProvider>
  );
}

export default App;

import React, { lazy, Suspense, ReactElement } from 'react';
import './index.css';
import { Route, Switch } from 'react-router-dom';
import NotFound from 'components/NotFound/NotFound';
import Referral from 'components/Referral/Referral';
import { PreLoader } from 'components/UI/PreLoader';
import MainDex from 'components/DEX/MainDex';
import TykloKeyContextProvider from './components/Wallets/TykloKeyContext';

const DashboardWrapper = lazy(() => import('./components/Dashboard'));
const Profile = lazy(() => import('./components/Profile'));
const Farms = lazy(() => import('./components/Farms'));
const TokenScanSummary = React.lazy(
  () => import('./components/TokenScanSummary'),
);
const Wallet = lazy(() => import('./components/Wallets/Wallets'));
const Faq = lazy(() => import('./components/Faq/Faq'));
const Setting = lazy(() => import('./components/Settings/Settings'));
const WalletDetails = lazy(() => import('./components/Wallets/WalletDetails'));
const WalletMetamask = lazy(() => import('./components/Wallets/WalletMetamask'));
const TykloWallet = lazy(() => import('./components/Wallets/TykloWallet'));
const PrivacyPolicy = lazy(() => import('./components/Legals/Privacy'));
const TermsServices = lazy(() => import('./components/Legals/Terms'));
const TykloWalletImport = lazy(
  () => import('./components/Wallets/TykloWalletImport'),
);
const TykloWalletCreate = lazy(
  () => import('./components/Wallets/TykloWalletCreate'),
);

const TykloWalletSuccess = lazy(
  () => import('./components/Wallets/TykloSuccess'),
);

const TykloWalletBackup = lazy(
  () => import('./components/Wallets/BackupMneumonicKey'),
);

const FiatGateWay = lazy(() => import('./components/FiatGateWay'));
const ComingSoon = lazy(() => import('./components/ComingSoon/ComingSoon'));
const Farm = lazy(() => import('./components/Farm/Farm'));
const DEX = lazy(() => import('./components/DEX'));
const Multichart = lazy(() => import('./components/Multichart'));

const Routes = (): ReactElement => (
  <Suspense fallback={<div style={{ display: 'flex', flex: "1" }} ><PreLoader /></div>}>
    <Switch>
      <Route exact path="/" component={DashboardWrapper} />
      <Route exact path="/dashboard" component={DashboardWrapper} />
      <Route exact path="/dashboard/:address" component={TokenScanSummary} />
      <Route exact path="/farms" component={ComingSoon} />
      {/* <Route exact path="/wallet" component={Wallet} /> */}
      {/* <Route exact path="/faq" component={Faq} /> */}
      <Route exact path="/faq" component={ComingSoon} />
      <Route exact path="/setting" component={Setting} />
      <Route exact path="/wallet/details" component={WalletDetails} />
      <Route exact path="/wallet/metamask/:redirect" component={WalletMetamask} />
      {/* <Route exact path="/wallet/tyklo" component={TykloWallet} />
      <Route exact path="/wallet/tyklo/import" component={TykloWalletImport} />
      <Route exact path="/wallet/tyklo/create" component={TykloWalletCreate} /> */}
      <Route exact path="/wallet/tyklo" component={ComingSoon} />
      <Route exact path="/wallet/tyklo/import" component={ComingSoon} />
      <Route exact path="/wallet/tyklo/create" component={ComingSoon} />
      <Route
        exact
        path="/wallet/tyklo/create/backup"
        component={TykloWalletBackup}
      />
      <Route
        exact
        path="/wallet/tyklo/success"
        component={TykloWalletSuccess}
      />
      <Route
        exact
        path="/fiat-gateway"
        component={FiatGateWay}
      />

      <Route
        exact
        path="/dex"
        component={DEX}
      />

      <Route
        exact
        path="/multichart"
        component={Multichart}
      />

      {/* <Route
        exact
        path="/farm"
        component={Farm}
      /> */}
      <Route
        exact
        path="/farm"
        component={ComingSoon}
      />

      <Route
        exact
        path="/referral"
        component={Referral}
      />

      <Route
        exact
        path="/profile"
        component={Profile}
      />
      <Route
        exact
        path="/privacy"
        component={PrivacyPolicy}
      />
      <Route
        exact
        path="/terms"
        // component={Profile}
      />

      <Route path="*"
        component={NotFound}
      />
    </Switch>
  </Suspense>
);

export default Routes;

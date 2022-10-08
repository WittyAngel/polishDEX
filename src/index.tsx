import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import ErrorBoundry from "components/ErrorBoundry";
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import theme from './theme';
import './i18n';
import { CoinContextProvider } from './context/CoinContext';
import Techinical from './components/ComingSoon/Technical';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorBoundry>
            <CoinContextProvider>
              <App />
              {/* <Techinical/> */}
            </CoinContextProvider>
          </ErrorBoundry>
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

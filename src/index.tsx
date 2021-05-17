import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from './config.json';
import App from './App';
import { store } from './state/store';

import './assets/css/normalize.css';
import './assets/css/base.css';
import './assets/css/common.css';
import './assets/css/styles.css';

const auth0Props: Auth0ProviderOptions = {
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
  redirectUri: window.location.origin,
  audience: 'http://opus-chat.com/api',
  scope: 'openid profile email',
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider {...auth0Props}>
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

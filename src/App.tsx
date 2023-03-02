import React from 'react';
import {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal
} from '@multiversx/sdk-dapp/UI';
import { DappProvider } from '@multiversx/sdk-dapp/wrappers';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'components';
import UpdateNotification from 'components/UpdateNotification';
import { API_TIMEOUT, ENVIRONMENT, WALLET_CONNECT_V2_PROJECT_ID } from 'config';
import { Convert } from 'pages';
import routes from 'routes';

const firebaseConfig = {
  apiKey: 'AIzaSyARYfACpXSYBf43zq9RHDGxisJD1Xj5nfs',
  authDomain: 'xdust-3593f.firebaseapp.com',
  projectId: 'xdust-3593f',
  storageBucket: 'xdust-3593f.appspot.com',
  messagingSenderId: '874954695580',
  appId: '1:874954695580:web:7cb69b8c473110d6c0de59',
  measurementId: 'G-P1LR266TWE'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Analytics and get a reference to the service
const analytics = getAnalytics(app);
logEvent(analytics, 'notification_received');

export const App = () => {
  return (
    <>
      <UpdateNotification />
      <Router>
        <DappProvider
          environment={ENVIRONMENT}
          dappConfig={{
            shouldUseWebViewProvider: true
          }}
          customNetworkConfig={{
            name: 'customConfig',
            apiTimeout: API_TIMEOUT,
            walletConnectV2ProjectId: WALLET_CONNECT_V2_PROJECT_ID
          }}
        >
          <Layout>
            <TransactionsToastList />
            <NotificationModal />
            <SignTransactionsModals className='custom-class-for-modals' />
            <Routes>
              {routes.map((route: any, index: number) => (
                <Route
                  path={route.path}
                  key={'route-key-' + index}
                  element={<route.component />}
                />
              ))}
              <Route path='*' element={<Convert />} />
            </Routes>
          </Layout>
        </DappProvider>
      </Router>
    </>
  );
};

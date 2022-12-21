import React from 'react';
import {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal
} from '@elrondnetwork/dapp-core/UI';
import { DappProvider } from '@elrondnetwork/dapp-core/wrappers';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'components';
import NoFeeNotification from 'components/NoFeeNotification';
import UpdateNotification from 'components/UpdateNotification';
import { API_TIMEOUT, ENVIRONMENT, WALLET_CONNECT_V2_PROJECT_ID } from 'config';
import { Convert } from 'pages';

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
      <NoFeeNotification />
      <UpdateNotification />
      <Router>
        <DappProvider
          environment={ENVIRONMENT}
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
              <Route path='*' element={<Convert />} />
            </Routes>
          </Layout>
        </DappProvider>
      </Router>
    </>
  );
};

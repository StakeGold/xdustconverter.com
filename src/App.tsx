import React from 'react';
import {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal
} from '@elrondnetwork/dapp-core/UI';
import { DappProvider } from '@elrondnetwork/dapp-core/wrappers';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'components';
import NoFeeNotification from 'components/NoFeeNotification';
import UpdateNotification from 'components/UpdateNotification';
import { API_TIMEOUT, ENVIRONMENT, WALLET_CONNECT_V2_PROJECT_ID } from 'config';
import { Convert } from 'pages';

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

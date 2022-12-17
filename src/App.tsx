import React from 'react';
import {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal
} from '@elrondnetwork/dapp-core/UI';
import { DappProvider } from '@elrondnetwork/dapp-core/wrappers';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'components';
import UpdateNotification from 'components/UpdateNotification';
import { apiTimeout, environment, walletConnectV2ProjectId } from 'config';
import { Convert } from 'pages';

export const App = () => {
  return (
    <>
      <UpdateNotification />
      <Router>
        <DappProvider
          environment={environment}
          customNetworkConfig={{
            name: 'customConfig',
            apiTimeout,
            walletConnectV2ProjectId
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

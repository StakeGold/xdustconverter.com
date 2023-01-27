import React from 'react';
import {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal,
  PageState,
  Loader
} from '@elrondnetwork/dapp-core/UI';
import {
  AxiosInterceptorContext,
  DappProvider
} from '@elrondnetwork/dapp-core/wrappers';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'components';
import { ApolloWrapper } from 'components/ApolloWrapper';
import UpdateNotification from 'components/UpdateNotification';
import { useGetDappConfig } from 'hooks/useGetDappConfig';
import { Convert } from 'pages';
import routes from 'routes';

export const AppWrapper = () => {
  const { dappConfig, loading } = useGetDappConfig();

  if (loading || !dappConfig) {
    return (
      <div className='center-screen'>
        <div className='card col-12 col-md-12 col-lg-9 col-xl-8 mx-auto text-center my-spacer'>
          {loading ? (
            <Loader />
          ) : (
            <PageState
              icon={faSadTear}
              className='text-muted'
              title='xDustConverter will be back soon'
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <UpdateNotification />
      <Router>
        <DappProvider
          environment={dappConfig.environment}
          customNetworkConfig={{
            name: 'customConfig',
            apiTimeout: dappConfig.apiTimeout,
            walletConnectV2ProjectId: dappConfig.walletConnectV2ProjectId
          }}
        >
          <ApolloWrapper>
            <AxiosInterceptorContext.Listener />
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
          </ApolloWrapper>
        </DappProvider>
      </Router>
    </>
  );
};

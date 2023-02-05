import React from 'react';
import { AxiosInterceptorContext } from '@elrondnetwork/dapp-core/wrappers';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { AppWrapper } from 'AppWrapper';
import { UnauthenticatedApolloWrapper } from 'components/ApolloWrapper';

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
    <AxiosInterceptorContext.Provider>
      <AxiosInterceptorContext.Interceptor authenticatedDomanis={[]}>
        <UnauthenticatedApolloWrapper>
          <AppWrapper />
        </UnauthenticatedApolloWrapper>
      </AxiosInterceptorContext.Interceptor>
    </AxiosInterceptorContext.Provider>
  );
};

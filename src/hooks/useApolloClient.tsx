import { useEffect, useRef } from 'react';
import { from, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useGetLoginInfo } from '@elrondnetwork/dapp-core/hooks';
import { API_GRAPHQL } from 'config.devnet';

export const useApolloClient = () => {
  const loginInfo = useGetLoginInfo();
  const bearerToken = loginInfo?.tokenLogin?.nativeAuthToken;

  const authMiddleware = setContext(async (_req, { headers }) => {
    let authorization = {};

    if (bearerToken) {
      authorization = { Authorization: `Bearer ${bearerToken}` };
    }

    return {
      headers: {
        ...headers,
        ...authorization
      }
    };
  });

  const httpLink = from([new HttpLink({ uri: API_GRAPHQL })]);

  const getNewClient = () => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: authMiddleware.concat(httpLink)
    });
  };

  const clientRef = useRef(getNewClient());

  useEffect(() => {
    clientRef.current = getNewClient();
  }, [loginInfo.isLoggedIn, loginInfo.tokenLogin?.nativeAuthToken]);

  return { client: clientRef.current };
};

export const unauthenticatedClient = new ApolloClient({
  uri: API_GRAPHQL,
  cache: new InMemoryCache()
});

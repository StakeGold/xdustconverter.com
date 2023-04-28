import { useEffect, useState } from 'react';
import { from, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';
import { API_GRAPHQL } from 'config';

export const useApolloClient = () => {
  const httpLink = from([new HttpLink({ uri: API_GRAPHQL })]);

  const authMiddleware = (bearerToken?: string) => {
    return setContext(async (_req, { headers }) => {
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
  };

  const getNewClient = (bearerToken?: string) => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: authMiddleware(bearerToken).concat(httpLink)
    });
  };

  const loginInfo = useGetLoginInfo();
  const [client, setClient] = useState(getNewClient());

  useEffect(() => {
    const nativeAuthToken = loginInfo.tokenLogin?.nativeAuthToken;
    const newClient = getNewClient(nativeAuthToken);
    setClient(newClient);
  }, [loginInfo.isLoggedIn, loginInfo.tokenLogin?.nativeAuthToken]);

  return { client };
};

export const unauthenticatedClient = new ApolloClient({
  uri: API_GRAPHQL,
  cache: new InMemoryCache()
});

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { API_GRAPHQL } from 'config';

const client = new ApolloClient({
  uri: API_GRAPHQL,
  cache: new InMemoryCache()
});

export default client;

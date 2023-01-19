import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApolloClient } from 'hooks/useApolloClient';

export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  const { client } = useApolloClient();

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { unauthenticatedClient, useApolloClient } from 'hooks/useApolloClient';

export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  const { client } = useApolloClient();

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export const UnauthenticatedApolloWrapper = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <ApolloProvider client={unauthenticatedClient}>{children}</ApolloProvider>
  );
};

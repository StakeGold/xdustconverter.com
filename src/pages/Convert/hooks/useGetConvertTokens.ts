import React from 'react';
import { ApolloError, useQuery } from '@apollo/client';
import { PROTOCOL_FEE } from '../../../api/queries';

export const useGetConvertTokens = (): {
  tokens: string[];
  loading: boolean;
  error?: ApolloError;
} => {
  // TODO
  const { data, loading, error } = useQuery(PROTOCOL_FEE);

  return React.useMemo(() => {
    return {
      tokens: ['WEGLD', 'USDC'],
      loading,
      error
    };
  }, [data, loading, error]);
};

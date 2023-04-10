import React from 'react';
import { ApolloError, useQuery } from '@apollo/client';
import { CUSTOM_CONVERT_TOKENS } from '../../../api/queries/convertTokens';
import { AccountToken } from '../../../types';

export const useGetConvertTokens = (): {
  tokens: string[];
  loading: boolean;
  error?: ApolloError;
} => {
  const { data, loading, error } = useQuery(CUSTOM_CONVERT_TOKENS);

  return React.useMemo(() => {
    return {
      tokens: data ? data.map((token: AccountToken) => token.identifier) : [],
      loading,
      error
    };
  }, [data, loading, error]);
};

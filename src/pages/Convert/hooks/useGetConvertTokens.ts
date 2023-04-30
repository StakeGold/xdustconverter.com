import React from 'react';
import { ApolloError, useQuery } from '@apollo/client';
import { ConvertToken } from 'types';
import { CUSTOM_CONVERT_TOKENS } from '../../../api/queries/convertTokens';

export const useGetConvertTokens = (): {
  tokens: ConvertToken[];
  loading: boolean;
  error?: ApolloError;
} => {
  const { data, loading, error } = useQuery(CUSTOM_CONVERT_TOKENS);

  return React.useMemo(() => {
    return {
      tokens: (data?.customConvertTokens ?? []) as ConvertToken[],
      loading,
      error
    };
  }, [data, loading, error]);
};

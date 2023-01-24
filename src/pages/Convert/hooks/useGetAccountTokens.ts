import React from 'react';
import { useQuery } from '@apollo/client';
import { ACCOUNT_DETAILS } from 'api/queries';
import { AccountToken } from 'types';

export const useGetAccountTokens = () => {
  const {
    data,
    loading: isLoading,
    error,
    refetch
  } = useQuery(ACCOUNT_DETAILS);

  return React.useMemo(() => {
    const tokens = data?.accountDetails.tokens as AccountToken[];

    return { tokens, isLoading, error, reloadTokens: refetch };
  }, [data]);
};

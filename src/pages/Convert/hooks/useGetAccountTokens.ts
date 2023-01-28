import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useGetAccount } from '@elrondnetwork/dapp-core/hooks';
import { ACCOUNT_DETAILS, WHITELISTED_TOKENS } from 'api/queries';
import { AccountToken } from 'types';

export const useGetAccountTokens = () => {
  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);

  const {
    data,
    loading: isLoading,
    error,
    refetch
  } = useQuery(isLoggedIn ? ACCOUNT_DETAILS : WHITELISTED_TOKENS);

  useEffect(() => {
    refetch();
  }, [isLoggedIn]);

  return React.useMemo(() => {
    const tokens = (data?.accountDetails?.tokens ??
      data?.whitelistedTokens) as AccountToken[];

    return { tokens, isLoading, error, reloadTokens: refetch };
  }, [data]);
};

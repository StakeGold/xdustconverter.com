import React from 'react';
import { useQuery } from '@apollo/client';
import { useGetLoginInfo } from '@elrondnetwork/dapp-core/hooks';
import { REFERRAL_INFO } from 'api/queries';
import { ReferralDetails, TierDetails } from 'types';

export const useGetReferralDetails = () => {
  const login = useGetLoginInfo();

  const { data, loading, error, refetch } = useQuery(REFERRAL_INFO, {
    context: {
      headers: { authorization: `Bearer ${login.tokenLogin?.nativeAuthToken}` }
    }
  });

  return React.useMemo(() => {
    const referralDetails =
      data && data.accountReferralInfo
        ? ReferralDetails.fromResponse(data.accountReferralInfo)
        : undefined;
    const tiers =
      data && data.allTiers
        ? data?.allTiers.map(TierDetails.fromResponse)
        : undefined;
    return {
      referralDetails,
      tiers,
      isLoading: loading,
      error,
      refetchReferralDetails: refetch
    };
  }, [data, loading, error]);
};

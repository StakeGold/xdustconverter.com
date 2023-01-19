import React from 'react';
import { useQuery } from '@apollo/client';
import { REFERRAL_INFO } from 'api/queries';
import { ReferralDetails, TierDetails } from 'types';

export const useGetReferralDetails = () => {
  const { data, loading, error, refetch } = useQuery(REFERRAL_INFO);

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

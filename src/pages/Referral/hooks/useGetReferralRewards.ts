import React from 'react';
import { useQuery } from '@apollo/client';
import { REFERRAL_INFO } from 'api/queries';
import { ReferralRewards } from 'types';

export const useGetReferralRewards = (): {
  rewards: ReferralRewards | undefined;
  reloadReferralRewards: any;
} => {
  const { data, refetch } = useQuery(REFERRAL_INFO);

  return React.useMemo(() => {
    const rewards = data?.accountReferralInfo
      ?.referralRewards as ReferralRewards;

    return {
      rewards,
      reloadReferralRewards: refetch
    };
  }, [data]);
};

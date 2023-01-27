import React from 'react';
import { useQuery } from '@apollo/client';
import { REFERRAL_INFO } from 'api/queries';

export const useGetReferralFeePercentage = (): { feePercent: number } => {
  const { data } = useQuery(REFERRAL_INFO);

  return React.useMemo(() => {
    const feePercent = data.accountReferralInfo.feePercentage;
    return feePercent;
  }, [data]);
};

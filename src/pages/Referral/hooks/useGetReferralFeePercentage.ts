import React from 'react';
import { useQuery } from '@apollo/client';
import { REFERRAL_INFO } from 'api/queries';

export const useGetReferralFeePercentage = () => {
  const { data } = useQuery(REFERRAL_INFO);

  return React.useMemo(() => {
    const feePercent = data.accountReferralInfo.feePercentage;
    return {
      feePercent
    };
  }, [data]);
};

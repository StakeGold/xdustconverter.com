import React from 'react';
import { ClaimReferralRewards } from './ClaimReferralRewards';
import { ReferralInfo } from './ReferralInfo';

export const ReferralLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <ClaimReferralRewards />
      {children}
      <ReferralInfo />
    </>
  );
};

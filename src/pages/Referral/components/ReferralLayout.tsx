import React from 'react';
import { ClaimReferralRewards } from './ClaimReferralRewards';
import { ReferralInfo } from './ReferralInfo';

export const ReferralLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <ClaimReferralRewards />
      <div className='card mb-4'>{children}</div>
      <ReferralInfo />
    </>
  );
};

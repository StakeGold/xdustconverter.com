import React from 'react';
import { useGetReferralRewards } from './hooks';

export const ClaimReferralRewards = () => {
  const referralRewards = useGetReferralRewards();

  if (referralRewards === '0') {
    return <></>;
  }

  return (
    <div className='card claim-rewards-card mb-4'>
      <div>
        <h3>Referral rewards</h3>
        {referralRewards} WEGLD
      </div>
      <button className='btn'>Claim rewards</button>
    </div>
  );
};

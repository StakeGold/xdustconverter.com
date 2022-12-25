import React from 'react';
import { ReferralClaim, ReferralLayout } from './components';
import { ReferralRegister } from './components/ReferralRegister';

const ReferralPage = () => {
  return (
    <div>
      <ReferralClaim />
      <ReferralRegister />
    </div>
  );
};

export const Referral = () => (
  <ReferralLayout>
    <ReferralPage />
  </ReferralLayout>
);

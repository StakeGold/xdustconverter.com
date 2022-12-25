import React from 'react';
import { ReferralAlreadyRegistered, ReferralLayout } from './components';
import { ReferralRegister } from './components/ReferralRegister';
import { useGetUserReferralTag } from './hooks';

const ReferralPage = () => {
  const userTag = useGetUserReferralTag();

  if (userTag) {
    return <ReferralAlreadyRegistered userTag={userTag} />;
  }

  return <ReferralRegister />;
};

export const Referral = () => (
  <ReferralLayout>
    <ReferralPage />
  </ReferralLayout>
);

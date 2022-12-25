import React, { useEffect } from 'react';
import { useGetActiveTransactionsStatus } from '@elrondnetwork/dapp-core/hooks';
import { Loader, PageState } from '@elrondnetwork/dapp-core/UI';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ReferralAlreadyRegistered, ReferralLayout } from './components';
import { ReferralRegister } from './components/ReferralRegister';
import { useGetReferralFeePercentage, useGetUserReferralTag } from './hooks';

const ReferralPage = () => {
  // TODO contract paused

  const { tag, isLoading, error, reloadTag } = useGetUserReferralTag();
  const referralFeePercentage = useGetReferralFeePercentage(tag);

  const { success } = useGetActiveTransactionsStatus();

  useEffect(() => {
    if (success) {
      reloadTag();
    }
  }, [success]);

  if (isLoading || referralFeePercentage === undefined) {
    return (
      <div className='card mb-4'>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className='card mb-4'>
        <PageState
          icon={faClose}
          className='text-muted'
          title='Unable to load.'
        />
      </div>
    );
  }

  if (tag) {
    return (
      <ReferralAlreadyRegistered
        tag={tag}
        feePercentage={referralFeePercentage}
      />
    );
  }
  return <ReferralRegister />;
};

export const Referral = () => (
  <ReferralLayout>
    <ReferralPage />
  </ReferralLayout>
);

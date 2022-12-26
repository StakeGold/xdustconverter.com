import React, { useEffect } from 'react';
import {
  useGetAccount,
  useGetActiveTransactionsStatus
} from '@elrondnetwork/dapp-core/hooks';
import { Loader, PageState } from '@elrondnetwork/dapp-core/UI';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import ActionOrConnect from 'components/ActionOrConnect';
import { ReferralAlreadyRegistered, ReferralLayout } from './components';
import { ReferralRegister } from './components/ReferralRegister';
import { useGetReferralFeePercentage, useGetUserReferralTag } from './hooks';

const ReferralPage = () => {
  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);

  const { tag, isLoading, error, reloadTag } = useGetUserReferralTag();
  const referralFeePercentage = useGetReferralFeePercentage(tag);

  const { success } = useGetActiveTransactionsStatus();

  useEffect(() => {
    if (success) {
      reloadTag();
    }
  }, [success]);

  if (!isLoggedIn) {
    return (
      <div className='card mb-4'>
        <ActionOrConnect>
          <></>
        </ActionOrConnect>
      </div>
    );
  }

  if (isLoading) {
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

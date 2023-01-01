import React, { useEffect } from 'react';
import {
  useGetAccount,
  useGetActiveTransactionsStatus
} from '@elrondnetwork/dapp-core/hooks';
import { Loader, PageState } from '@elrondnetwork/dapp-core/UI';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import ActionOrConnect from 'components/ActionOrConnect';
import {
  ReferralAlreadyRegistered,
  ReferralLayout,
  ReferralTiers
} from './components';
import { ReferralRegister } from './components/ReferralRegister';
import { useGetReferralDetails } from './hooks';

const ReferralPage = () => {
  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);

  const { referralDetails, tiers, isLoading, error, refetchReferralDetails } =
    useGetReferralDetails();

  const { success } = useGetActiveTransactionsStatus();

  useEffect(() => {
    if (success) {
      refetchReferralDetails();
    }
  }, [success]);

  if (!isLoggedIn) {
    return (
      <>
        <div className='card mb-4'>
          <ActionOrConnect>
            <></>
          </ActionOrConnect>
        </div>
        <ReferralTiers tiers={tiers} />
      </>
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

  if (referralDetails) {
    return (
      <ReferralAlreadyRegistered referral={referralDetails} tiers={tiers} />
    );
  }
  return <ReferralRegister tiers={tiers} />;
};

export const Referral = () => (
  <ReferralLayout>
    <ReferralPage />
  </ReferralLayout>
);

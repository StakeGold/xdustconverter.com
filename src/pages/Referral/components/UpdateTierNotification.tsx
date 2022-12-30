import React, { useEffect, useState } from 'react';
import { useGetActiveTransactionsStatus } from '@elrondnetwork/dapp-core/hooks';
import { Transaction } from '@elrondnetwork/erdjs/out';
import BigNumber from 'bignumber.js';
import { Spinner } from 'react-bootstrap';
import { sendAndSignTransactions } from 'apiCalls';
import { TierDetails } from 'types';
import { useUpgradeTier } from '../hooks';

export interface UpdateTierNotificationProps {
  nextTier: TierDetails | undefined;
  accumulatedVolume: BigNumber;
}

const UpdateTierNotification = ({
  nextTier,
  accumulatedVolume
}: UpdateTierNotificationProps) => {
  const callbackRoute = `${location.pathname}${location.search}`;

  const { success, pending } = useGetActiveTransactionsStatus();
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    setUpdateAvailable(
      nextTier
        ? accumulatedVolume.isGreaterThanOrEqualTo(nextTier.minVolume)
        : false
    );
  }, [nextTier, accumulatedVolume]);

  useEffect(() => {
    if (success) {
      window.location.reload();
    }
  }, [success]);

  const upgradeTier = useUpgradeTier();

  const processUpgradeTierTransaction = async (
    transaction: Transaction | undefined
  ) => {
    try {
      if (transaction === undefined) {
        return;
      }

      const displayInfo = {
        processingMessage: 'Upgrade tier',
        errorMessage: 'An error has occurred while upgrading tier',
        successMessage: 'Tier upgraded'
      };
      await sendAndSignTransactions([transaction], displayInfo, callbackRoute);
    } catch (err: any) {
      console.log('processClaimRewardsTransaction error', err);
    }
  };

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();

    const transaction = upgradeTier();
    processUpgradeTierTransaction(transaction);
  };

  return updateAvailable ? (
    <div
      className={`card update-tier-card shine tier-${nextTier?.name.toLowerCase()}`}
    >
      <span className='font-weight-bold'>
        Congratulations! You are now eligible to upgrade to the {nextTier?.name}{' '}
        tier.
      </span>
      <div>
        <button
          className='btn btn-logout mt-2'
          onClick={handleSubmit}
          disabled={pending}
        >
          {pending ? (
            <Spinner as='span' animation='border' size='sm' />
          ) : (
            <>Upgrade</>
          )}
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default UpdateTierNotification;

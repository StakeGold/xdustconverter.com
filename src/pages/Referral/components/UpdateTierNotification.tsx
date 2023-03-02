import React, { useEffect, useMemo } from 'react';
import { useGetActiveTransactionsStatus } from '@multiversx/sdk-dapp/hooks';
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
  const { success, pending } = useGetActiveTransactionsStatus();
  const updateAvailable = useMemo(() => {
    return nextTier
      ? accumulatedVolume.isGreaterThanOrEqualTo(nextTier.minVolume)
      : false;
  }, [nextTier, accumulatedVolume]);

  useEffect(() => {
    if (success) {
      window.location.reload();
    }
  }, [success]);

  const upgradeTier = useUpgradeTier();

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      const { transaction, displayInfo } = upgradeTier();
      if (!transaction) {
        return;
      }

      await sendAndSignTransactions([transaction], displayInfo);
    } catch (err: any) {
      console.log('processClaimRewardsTransaction error', err);
    }
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

import React, { useEffect } from 'react';
import { useGetActiveTransactionsStatus } from '@elrondnetwork/dapp-core/hooks';
import { Spinner } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { sendAndSignTransactions } from 'apiCalls';
import { TokenAmountWithTooltip } from 'components';
import { TierDetails } from 'types';
import { useClaimReferralRewards, useGetReferralRewards } from '../hooks';

interface ClaimReferralRewardsProps {
  tier: TierDetails;
}

export const ClaimReferralRewards = ({ tier }: ClaimReferralRewardsProps) => {
  // TODO refactoring
  const { rewards, reloadReferralRewards } = useGetReferralRewards();
  const { success, pending } = useGetActiveTransactionsStatus();

  const location = useLocation();
  const callbackRoute = `${location.pathname}${location.search}`;

  const claimReferralRewards = useClaimReferralRewards();

  useEffect(() => {
    if (success) {
      reloadReferralRewards();
    }
  }, [success]);

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      const { transaction, displayInfo } = claimReferralRewards();
      if (!transaction) {
        return;
      }

      await sendAndSignTransactions([transaction], displayInfo, callbackRoute);
    } catch (err: any) {
      console.log('processClaimRewardsTransaction error', err);
    }
  };

  if (rewards.egld === '0') {
    return <></>;
  }

  return (
    <>
      <div
        className={`card claim-rewards-card shine tier-${tier.name.toLowerCase()} mb-4`}
      >
        <div className='content'>
          <h4 className='mb-1'>Referral rewards</h4>
          <span>
            <TokenAmountWithTooltip
              value={rewards.egld}
              decimals={18}
              egldLabel={'WEGLD'}
              digits={4}
            />
            {rewards.usd && (
              <small className='d-block text-secondary'>≈ ${rewards.usd}</small>
            )}
          </span>
        </div>
        <button
          className='btn btn-logout'
          onClick={(e) => handleSubmit(e)}
          disabled={pending}
        >
          {pending ? (
            <Spinner as='span' animation='border' size='sm' />
          ) : (
            <>Claim rewards</>
          )}
        </button>
      </div>
    </>
  );
};

import React, { useEffect, useMemo } from 'react';
import { useGetActiveTransactionsStatus } from '@multiversx/sdk-dapp/hooks';
import BigNumber from 'bignumber.js';
import { Spinner } from 'react-bootstrap';
import { TokenAmountWithTooltip } from 'components';
import { TierDetails } from 'types';
import { useClaimReferralRewards, useGetReferralRewards } from '../hooks';

interface ClaimReferralRewardsProps {
  tier: TierDetails;
}

export const ClaimReferralRewards = ({ tier }: ClaimReferralRewardsProps) => {
  const minimumClaimAmount = 0.1;

  // TODO refactoring
  const { rewards, reloadReferralRewards } = useGetReferralRewards();
  const { success, pending } = useGetActiveTransactionsStatus();

  const { claimReferralRewards, loading } = useClaimReferralRewards();

  useEffect(() => {
    if (success) {
      reloadReferralRewards();
    }
  }, [success]);

  const isLowerThanMinimum = useMemo(() => {
    return new BigNumber(rewards?.balance ?? 0)
      .shiftedBy(-18)
      .isLessThan(minimumClaimAmount);
  }, [rewards]);

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      claimReferralRewards();
    } catch (err: any) {
      console.log('processClaimRewardsTransaction error', err);
    }
  };

  if (rewards.balance === '0') {
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
              value={rewards.balance}
              decimals={18}
              egldLabel={'WEGLD'}
              digits={4}
            />
            {rewards.valueUsd && (
              <small className='d-block text-secondary'>
                ≈ ${rewards.valueUsd}
              </small>
            )}
          </span>
        </div>
        <div className='action'>
          <button
            className='btn btn-logout'
            onClick={(e) => handleSubmit(e)}
            disabled={pending || isLowerThanMinimum || loading}
          >
            {pending || loading ? (
              <Spinner as='span' animation='border' size='sm' />
            ) : (
              <>Claim rewards</>
            )}
          </button>
          {isLowerThanMinimum && (
            <i className='mt-1'>Minimum amount is {minimumClaimAmount} EGLD</i>
          )}
        </div>
      </div>
    </>
  );
};

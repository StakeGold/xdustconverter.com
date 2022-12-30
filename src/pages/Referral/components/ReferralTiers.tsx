import React from 'react';
import { FormatAmount } from '@elrondnetwork/dapp-core/UI';
import { ReferralDetails, TierDetails } from 'types';
import { ClaimReferralRewards } from './ClaimReferralRewards';
import UpdateTierNotification from './UpdateTierNotification';

interface ReferralTiersProps {
  referral?: ReferralDetails;
  tiers: TierDetails[];
}

export const ReferralTiers = ({ referral }: ReferralTiersProps) => {
  if (!referral) {
    // TODO show all tiers
    return <></>;
  }

  return (
    <>
      <UpdateTierNotification
        nextTier={referral.nextTier}
        accumulatedVolume={referral.accumulatedVolume}
      />
      {referral.nextTier && (
        <div
          className={`card tier-next-card shine tier-${referral.nextTier.name.toLowerCase()}`}
        >
          <div className='content'>
            <h4>
              Next Tier:{' '}
              <span className='font-weight-bold'>{referral.nextTier.name}</span>
            </h4>
            <div className='info'>
              <div>
                Referral volume: {'>'}{' '}
                <span className='font-weight-bold'>
                  <FormatAmount
                    value={referral.nextTier.minVolume.toFixed()}
                    decimals={18}
                    showLabel={true}
                    digits={4}
                    showLastNonZeroDecimal={false}
                  />
                </span>
              </div>
              <div>
                Referral fees:{' '}
                <span className='font-weight-bold'>
                  {referral.nextTier.feePercent}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {referral.currentTier && (
        <div
          className={`card tier-card shine tier-${referral.currentTier.name.toLowerCase()} mb-4`}
        >
          <div className='content d-flex justify-content-between align-items-center'>
            <h4 className='mb-1'>
              Current tier:{' '}
              <span className='font-weight-bold'>
                {referral.currentTier.name}
              </span>
            </h4>
            <div className='info'>
              <div>
                Accumulated volume:{' '}
                <span className='font-weight-bold'>
                  <FormatAmount
                    value={referral.accumulatedVolume.toFixed()}
                    decimals={18}
                    showLabel={true}
                    digits={4}
                    showLastNonZeroDecimal={false}
                  />
                </span>
              </div>
              <div>
                Referral fees:{' '}
                <span className='font-weight-bold'>
                  {referral.currentTier.feePercent}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <ClaimReferralRewards />
    </>
  );
};

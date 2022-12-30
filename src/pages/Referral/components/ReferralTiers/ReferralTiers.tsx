import React, { useState } from 'react';
import { FormatAmount } from '@elrondnetwork/dapp-core/UI';
import { ReferralDetails, TierDetails } from 'types';
import { ClaimReferralRewards } from '../ClaimReferralRewards';
import UpdateTierNotification from '../UpdateTierNotification';
import { Tier } from './Tier';

interface ReferralTiersProps {
  referral?: ReferralDetails;
  tiers: TierDetails[];
}

export const ReferralTiers = ({ referral, tiers }: ReferralTiersProps) => {
  const [activeTier, setActiveTier] = useState<string>('Bronze');

  return (
    <>
      {referral && (
        <UpdateTierNotification
          nextTier={referral.nextTier}
          accumulatedVolume={referral.accumulatedVolume}
        />
      )}
      <div className='tier-gallery mb-4'>
        {tiers.map((tier) => {
          const isActive = tier.name === activeTier;
          let isLocked = true;
          if (!referral && tier.name === tiers[0].name) {
            isLocked = false;
          }
          if (referral && referral.currentTier.name === tier.name) {
            isLocked = false;
          }

          return (
            <Tier
              key={tier.name}
              tier={tier}
              isActive={isActive}
              isLocked={isLocked}
              setActiveTier={() => setActiveTier(tier.name)}
            />
          );
        })}
      </div>
      {referral?.nextTier && (
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
      {referral?.currentTier && (
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

import React, { useEffect, useState } from 'react';
import { ReferralDetails, TierDetails } from 'types';
import { ClaimReferralRewards } from '../ClaimReferralRewards';
import UpdateTierNotification from '../UpdateTierNotification';
import { Tier } from './Tier';

interface ReferralTiersProps {
  referral?: ReferralDetails;
  tiers: TierDetails[];
}

export const ReferralTiers = ({ referral, tiers }: ReferralTiersProps) => {
  const [activeTier, setActiveTier] = useState<string>('');

  useEffect(() => {
    if (referral) {
      setActiveTier(referral.currentTier.name);
    } else if (tiers.length > 0) {
      setActiveTier(tiers[0].name);
    }
  }, [referral, tiers]);

  return (
    <>
      <div className='tier-gallery mb-4'>
        {tiers.map((tier) => (
          <Tier
            key={tier.name}
            tier={tier}
            defaultTier={tiers[0]}
            referral={referral}
            isActive={tier.name === activeTier}
            setActiveTier={() => setActiveTier(tier.name)}
          />
        ))}
      </div>
      {referral && (
        <>
          <ClaimReferralRewards tier={referral.currentTier} />
          <UpdateTierNotification
            nextTier={referral.nextTier}
            accumulatedVolume={referral.accumulatedVolume}
          />
        </>
      )}
    </>
  );
};

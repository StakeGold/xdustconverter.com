import React from 'react';
import { FormatAmount } from '@multiversx/sdk-dapp/UI';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReferralDetails, TierDetails } from 'types';

interface TierProps {
  tier: TierDetails;
  referral?: ReferralDetails;
  isActive: boolean;
  setActiveTier: () => void;
}

export const Tier = ({
  tier,
  referral,
  isActive,
  setActiveTier
}: TierProps) => {
  let isLocked = true;
  if (referral && referral.currentTier.name === tier.name) {
    isLocked = false;
  }

  const activeClass = isActive ? 'active' : '';
  const lockedClass = isLocked ? 'locked' : '';

  return (
    <div
      key={tier.name}
      className={`card tier-item shine tier-${tier.name.toLowerCase()} ${activeClass} ${lockedClass}`}
      onClick={setActiveTier}
    >
      <div className='inactive-header'>
        <h4 className='title font-weight-bold'>{tier.name}</h4>
        {isLocked && <FontAwesomeIcon icon={faLock} className='icon' />}
      </div>
      <div className='header'>
        <h4 className='font-weight-bold'>{tier.name}</h4>
        {isLocked && <FontAwesomeIcon icon={faLock} className='icon' />}
      </div>
      <div className='body'>
        {referral?.currentTier.name === tier.name ? (
          <div>
            Accumulated volume:{' '}
            <span className='font-weight-bold'>
              <FormatAmount
                value={referral?.accumulatedVolume.toFixed() ?? '0'}
                decimals={18}
                showLabel={true}
                digits={4}
                showLastNonZeroDecimal={false}
              />
            </span>
          </div>
        ) : (
          <div>
            Volume: {'>'}{' '}
            <span className='font-weight-bold'>
              <FormatAmount
                value={tier.minVolume.toFixed()}
                decimals={18}
                showLabel={true}
                digits={4}
                showLastNonZeroDecimal={false}
              />
            </span>
          </div>
        )}
        <div>
          Rewards percent:{' '}
          <span className='font-weight-bold'>{tier.feePercent}%</span>
        </div>
      </div>
    </div>
  );
};

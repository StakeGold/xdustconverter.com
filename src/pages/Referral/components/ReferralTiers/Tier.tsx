import React from 'react';
import { FormatAmount } from '@elrondnetwork/dapp-core/UI';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TierDetails } from 'types';

interface TierProps {
  isActive: boolean;
  isLocked: boolean;
  setActiveTier: () => void;
  tier: TierDetails;
}

export const Tier = ({
  tier,
  isActive,
  isLocked,
  setActiveTier
}: TierProps) => {
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
        <div>
          {/* // TODO your volume */}
          Referral volume: {'>'}{' '}
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
        <div>
          Referral fees:{' '}
          <span className='font-weight-bold'>{tier.feePercent}%</span>
        </div>
      </div>
    </div>
  );
};

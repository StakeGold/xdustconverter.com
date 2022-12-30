import React from 'react';
import { FormatAmount } from '@elrondnetwork/dapp-core/UI';
import BigNumber from 'bignumber.js';

interface ReferralTierProps {
  currentTier: any;
  accumulatedVolume: BigNumber;
  nextTier: any | undefined;
}

export const ReferralTier = ({
  currentTier,
  nextTier,
  accumulatedVolume
}: ReferralTierProps) => {
  return (
    <>
      {nextTier && (
        <div
          className={`card tier-next-card shine tier-${nextTier.name.toLowerCase()}`}
        >
          <div className='content'>
            <h4>
              Next Tier:{' '}
              <span className='font-weight-bold'>{nextTier.name}</span>
            </h4>
            <div className='info'>
              <div>
                Referral volume: {'>'}{' '}
                <span className='font-weight-bold'>
                  <FormatAmount
                    value={nextTier.minVolume}
                    decimals={18}
                    showLabel={true}
                    digits={4}
                    showLastNonZeroDecimal={false}
                  />
                </span>
              </div>
              <div>
                Referral fees:{' '}
                <span className='font-weight-bold'>{nextTier.feePercent}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentTier && (
        <div
          className={`card tier-card shine tier-${currentTier.name.toLowerCase()} mb-4`}
        >
          <div className='content d-flex justify-content-between align-items-center'>
            <h4 className='mb-1'>
              Current tier:{' '}
              <span className='font-weight-bold'>{currentTier.name}</span>
            </h4>
            <div className='info'>
              <div>
                Accumulated volume:{' '}
                <span className='font-weight-bold'>
                  <FormatAmount
                    value={accumulatedVolume.toFixed()}
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
                  {currentTier.feePercent}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

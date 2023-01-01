import React from 'react';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetProtocolFee } from 'pages/Convert/hooks';
import { ReferralDetails, TierDetails } from 'types';
import { InfoTooltip } from './InfoTooltip';
import { ReferralRewardsPercentTooltip } from './ReferralRewardsPercentTooltip';
import { ReferralTiers } from './ReferralTiers';

export interface ReferralAlreadyRegisteredProps {
  referral: ReferralDetails;
  tiers: TierDetails[];
}

export const ReferralAlreadyRegistered = ({
  referral,
  tiers
}: ReferralAlreadyRegisteredProps) => {
  const protocolFee = useGetProtocolFee();

  const referralUrl = `${window.location.origin}?referral=${referral.tag}`;

  const handleCopyReferralUrl = () => {
    navigator.clipboard.writeText(referralUrl);
  };

  return (
    <>
      <ReferralTiers referral={referral} tiers={tiers} />
      <div className='card referral-registered-card mb-4'>
        <h4 className='mb-4'>
          Share your tag with the community{' '}
          <InfoTooltip>
            <p>
              Share your tag with the community and earn rewards by bringing new
              users.
            </p>
          </InfoTooltip>
        </h4>
        <div className='mb-4'>
          <label>Your referral tag</label>
          <div className='referral-tag-input disabled'>{referral.tag}</div>
        </div>
        <div className='mb-4'>
          <label>
            Referral rewards percent{' '}
            <ReferralRewardsPercentTooltip
              protocolFee={protocolFee ?? 5}
              referralFee={referral.feePercentage}
            />
          </label>
          <div className='referral-tag-input disabled'>
            {referral.feePercentage}%
          </div>
        </div>
        <div>
          <label>Your referral link</label>
          <div className='referral-tag-input'>
            <a href={referralUrl} target='_blank' rel='noreferrer'>
              {referralUrl}
            </a>
            <FontAwesomeIcon
              icon={faCopy}
              className='btn btn-copy float-right'
              onClick={handleCopyReferralUrl}
            />
          </div>
        </div>
      </div>
    </>
  );
};

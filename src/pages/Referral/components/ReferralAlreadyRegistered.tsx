import React from 'react';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ReactComponent as InfoIcon } from 'assets/img/info.svg';
import { ReferralRewardsPercentTooltip } from './ReferralRewardsPercentTooltip';

export interface ReferralAlreadyRegisteredProps {
  tag: string;
}

export const ReferralAlreadyRegistered = ({
  tag
}: ReferralAlreadyRegisteredProps) => {
  const referralUrl = `${window.location.origin}?referral=${tag}`;

  const handleCopyReferralUrl = () => {
    navigator.clipboard.writeText(referralUrl);
  };

  const InfoTooltip = () => {
    return (
      <OverlayTrigger
        placement='top'
        overlay={(props) => (
          <Tooltip {...props}>
            <p>
              Share your tag with the community and earn rewards by bringing new
              users to our platform.
            </p>
          </Tooltip>
        )}
      >
        <InfoIcon style={{ width: '1.25rem', height: '1.25rem' }} />
      </OverlayTrigger>
    );
  };

  return (
    <div className='card referral-registered-card mb-4'>
      <h4 className='mb-4'>
        Share your tag with the community <InfoTooltip />
      </h4>
      <div className='mb-4'>
        <label>Your referral tag</label>
        <div className='referral-tag-input disabled'>{tag}</div>
      </div>
      <div className='mb-4'>
        <label>
          Referral rewards percent <ReferralRewardsPercentTooltip />
        </label>
        <div className='referral-tag-input disabled'>5%</div>
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
  );
};

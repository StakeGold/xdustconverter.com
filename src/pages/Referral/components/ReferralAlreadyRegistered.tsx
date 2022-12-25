import React from 'react';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  return (
    <div className='card referral-registered-card mb-4'>
      <h4 className='mb-4'>Share your tag with the community</h4>
      <div className='card card-info'>
        <p className='font-italic'>
          Share your tag with the community and earn rewards by bringing new
          users to our platform.
        </p>
        <p>
          Your referral tag: <b>{tag}</b>
        </p>
        <p className='mb-0'>
          Your referral link:{' '}
          <a href={referralUrl} target='_blank' rel='noreferrer'>
            {referralUrl}
          </a>
          <FontAwesomeIcon
            icon={faCopy}
            className='btn btn-copy'
            onClick={handleCopyReferralUrl}
          />
        </p>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useGetAccount } from '@elrondnetwork/dapp-core/hooks';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ReferralInfo = () => {
  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);

  const [expanded, setExpanded] = useState(!isLoggedIn);

  return (
    <div className='card referral-info-card mb-4'>
      <div className='header'>
        <h4>How it works</h4>
        <a
          className={`btn btn-secondary btn-logout ${expanded ? 'active' : ''}`}
          onClick={() => setExpanded(!expanded)}
        >
          <FontAwesomeIcon icon={faInfo} />
        </a>
      </div>
      {expanded && (
        <div className='card card-info mt-4'>
          <ol className='m-0'>
            <li>
              <h5>Create tag</h5>
              <p>
                Create your own referral tag by setting a unique descriptive
                name for your tag.
              </p>
            </li>
            <li>
              <h5>Share</h5>
              <p>
                Share your tag with the community and earn rewards by bringing
                new users to our platform.
              </p>
            </li>
            <li>
              <h5>Claim</h5>
              <p>
                Claim your rewards accumulated from the transactions made by the
                users on our platform.
              </p>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
};

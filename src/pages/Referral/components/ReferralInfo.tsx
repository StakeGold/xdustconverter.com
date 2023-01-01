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
              {/* <h5>Create tag</h5> */}
              <p>
                <span className='title'>Create</span> your own referral tag by
                setting a unique descriptive name for your tag.
              </p>
            </li>
            <li>
              {/* <h5>Share</h5> */}
              <p>
                <span className='title'>Share</span> your tag with the community
                and earn a percentage of the protocol fee by bringing new users.
              </p>
            </li>
            <li>
              {/* <h5>Claim</h5> */}
              <p>
                <span className='title'>Claim</span> your rewards accumulated
                from the transactions made by the users.
              </p>
            </li>
            <li>
              {/* <h5>Upgrade tier</h5> */}
              <p>
                <span className='title'>Upgrade</span> your tier when you become
                eligible to the next tier.
              </p>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
};

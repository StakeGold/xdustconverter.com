import React, { useState } from 'react';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ReferralInfo = () => {
  const [expanded, setExpanded] = useState(false);

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
              <h5>Set tag</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </li>
            <li>
              <h5>Share</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </li>
            <li>
              <h5>Earn</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </li>
            <li>
              <h5>Claim</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
};

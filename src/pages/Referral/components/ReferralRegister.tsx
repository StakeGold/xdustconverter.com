import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ReactComponent as InfoIcon } from 'assets/img/info.svg';

export const ReferralRegister = () => {
  const InfoTooltip = () => {
    return (
      <OverlayTrigger
        placement='top'
        overlay={(props) => (
          <Tooltip {...props}>
            <p>
              Create your own referral tag by setting a unique descriptive name
              for your tag.
            </p>
          </Tooltip>
        )}
      >
        <InfoIcon style={{ width: '1.25rem', height: '1.25rem' }} />
      </OverlayTrigger>
    );
  };

  return (
    <div className='card mb-4'>
      <h4 className='mb-4'>
        Create referral tag <InfoTooltip />
      </h4>
      <p className='font-italic'></p>
      <p>Tag: ....</p>
      <p>Fee percent: 5%</p>
      <button>Register</button>
    </div>
  );
};

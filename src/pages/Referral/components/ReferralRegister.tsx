import React, { useMemo, useState } from 'react';
import { OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { ReactComponent as InfoIcon } from 'assets/img/info.svg';

export const ReferralRegister = () => {
  const [tag, setTag] = useState('');

  const isLoading = false;
  const isDisabled = useMemo(() => {
    return tag.length === 0;
  }, [tag]);

  const handleSubmit = () => {
    // TODO
  };

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

  const FeeTooltip = () => {
    return (
      <OverlayTrigger
        placement='top'
        overlay={(props) => (
          <Tooltip {...props}>
            {/* TODO */}
            <p> </p>
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
      <div className='mb-4'>
        <label>Referral tag</label>
        <input
          className='referral-tag-input'
          type='text'
          placeholder='Referral tag..'
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        Referral rewards percent: 5% <FeeTooltip />
      </div>
      <button
        className='btn btn-primary btn-connect'
        onClick={handleSubmit}
        disabled={isLoading || isDisabled}
      >
        {isLoading ? (
          <Spinner as='span' animation='border' size='sm' />
        ) : (
          'Create referral tag'
        )}
      </button>
    </div>
  );
};

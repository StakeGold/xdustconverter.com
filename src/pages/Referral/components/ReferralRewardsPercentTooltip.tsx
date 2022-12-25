import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ReactComponent as InfoIcon } from 'assets/img/info.svg';

export const ReferralRewardsPercentTooltip = () => {
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

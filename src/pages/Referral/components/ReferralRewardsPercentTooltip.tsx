import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ReactComponent as InfoIcon } from 'assets/img/info.svg';

interface ReferralRewardsPercentTooltipProps {
  protocolFee: number;
  referralFee: number;
}

export const ReferralRewardsPercentTooltip = ({
  protocolFee,
  referralFee
}: ReferralRewardsPercentTooltipProps) => {
  return (
    <OverlayTrigger
      placement='top'
      overlay={(props) => (
        <Tooltip {...props}>
          <p>
            For a transaction of 1 EGLD, total protocol fee is{' '}
            {protocolFee / 100} EGLD from which you will receive{' '}
            {((protocolFee / 100) * referralFee) / 100} EGLD. ({referralFee}% of
            protocol fee)
          </p>
        </Tooltip>
      )}
    >
      <InfoIcon style={{ width: '1.25rem', height: '1.25rem' }} />
    </OverlayTrigger>
  );
};

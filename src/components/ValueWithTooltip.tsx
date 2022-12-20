import React from 'react';
import BigNumber from 'bignumber.js';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { MIN_AMOUNT } from 'config';

export interface ValueWithTooltipProps {
  formattedValue: string;
  value: string;
}

export const ValueWithTooltip = ({
  formattedValue,
  value
}: ValueWithTooltipProps) => {
  const valueBig = new BigNumber(value);

  return (
    <OverlayTrigger
      placement='top'
      overlay={(props) => (
        <Tooltip {...props}>
          <p>{value}</p>
        </Tooltip>
      )}
    >
      <span>
        {valueBig.isLessThanOrEqualTo(MIN_AMOUNT) && !valueBig.isEqualTo(0) ? (
          <>{`< ${MIN_AMOUNT}`}</>
        ) : (
          formattedValue
        )}
      </span>
    </OverlayTrigger>
  );
};

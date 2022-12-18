import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export interface ValueWithTooltipProps {
  formattedValue: string;
  value: string;
}

export const ValueWithTooltip = ({
  formattedValue,
  value
}: ValueWithTooltipProps) => {
  return (
    <OverlayTrigger
      placement='top'
      overlay={(props) => (
        <Tooltip {...props}>
          <p>{value}</p>
        </Tooltip>
      )}
    >
      <span>{formattedValue}</span>
    </OverlayTrigger>
  );
};

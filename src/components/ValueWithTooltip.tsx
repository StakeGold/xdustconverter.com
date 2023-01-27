import React from 'react';
import BigNumber from 'bignumber.js';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useGetDappConfig } from 'hooks/useGetDappConfig';

export interface ValueWithTooltipProps {
  formattedValue: string;
  value: string;
}

export const ValueWithTooltip = ({
  formattedValue,
  value
}: ValueWithTooltipProps) => {
  const { dappConfig } = useGetDappConfig();

  const valueBig = new BigNumber(value);

  if (!dappConfig) {
    return <></>;
  }

  const minAmount = dappConfig.minAmount;

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
        {valueBig.isLessThanOrEqualTo(minAmount) && !valueBig.isEqualTo(0) ? (
          <>{`< ${minAmount}`}</>
        ) : (
          formattedValue
        )}
      </span>
    </OverlayTrigger>
  );
};

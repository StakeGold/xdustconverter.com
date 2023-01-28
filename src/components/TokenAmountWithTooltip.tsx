import React from 'react';
import {
  FormatAmount,
  FormatAmountPropsType
} from '@elrondnetwork/dapp-core/UI';
import BigNumber from 'bignumber.js';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useGetDappConfig } from 'hooks/useGetDappConfig';

export const TokenAmountWithTooltip = ({ ...props }: FormatAmountPropsType) => {
  const { dappConfig } = useGetDappConfig();

  if (!dappConfig) {
    return <></>;
  }

  const minAmount = dappConfig.minAmount;
  const valueBig = new BigNumber(props.value).shiftedBy(-(props.decimals ?? 0));

  return (
    <OverlayTrigger
      placement='top'
      overlay={(overlayProps) => (
        <Tooltip {...overlayProps}>
          <FormatAmount
            value={props.value}
            decimals={props.decimals}
            showLabel={false}
            digits={props.decimals}
            showLastNonZeroDecimal={false}
          />
        </Tooltip>
      )}
    >
      <span>
        {valueBig.isLessThanOrEqualTo(minAmount) && !valueBig.isEqualTo(0) ? (
          <>{`< ${minAmount} ${props.egldLabel}`}</>
        ) : (
          <FormatAmount
            value={props.value}
            decimals={props.decimals}
            egldLabel={props.egldLabel}
            digits={props.digits}
            showLastNonZeroDecimal={false}
          />
        )}
      </span>
    </OverlayTrigger>
  );
};

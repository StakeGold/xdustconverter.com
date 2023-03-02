import React from 'react';
import {
  FormatAmount,
  FormatAmountPropsType
} from '@multiversx/sdk-dapp/UI';
import BigNumber from 'bignumber.js';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { MIN_AMOUNT } from 'config';

export const TokenAmountWithTooltip = ({ ...props }: FormatAmountPropsType) => {
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
        {valueBig.isLessThanOrEqualTo(MIN_AMOUNT) && !valueBig.isEqualTo(0) ? (
          <>{`< ${MIN_AMOUNT} ${props.egldLabel}`}</>
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

import React from 'react';
import {
  FormatAmount,
  FormatAmountPropsType
} from '@elrondnetwork/dapp-core/UI';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export const TokenAmountWithTooltip = ({ ...props }: FormatAmountPropsType) => {
  return (
    <OverlayTrigger
      placement='top'
      overlay={(overlayProps) => (
        <Tooltip {...overlayProps}>
          <FormatAmount
            value={props.value}
            decimals={props.decimals}
            showLabel={false}
            digits={props.value.length}
            showLastNonZeroDecimal={false}
          />
        </Tooltip>
      )}
    >
      <span>
        <FormatAmount
          value={props.value}
          decimals={props.decimals}
          egldLabel={props.egldLabel}
          digits={props.digits}
          showLastNonZeroDecimal={false}
        />
      </span>
    </OverlayTrigger>
  );
};

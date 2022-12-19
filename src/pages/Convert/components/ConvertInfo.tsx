import React from 'react';
import BigNumber from 'bignumber.js';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ReactComponent as InfoIcon } from 'assets/img/info.svg';
import { AccountToken } from 'types';
import { useGetProtocolFee } from '../hooks';

export interface ConvertInfoProps {
  checkedTokens: AccountToken[];
}

export const ConvertInfo = ({ checkedTokens }: ConvertInfoProps) => {
  const protocolFee = useGetProtocolFee();
  const formattedProtocolFee = protocolFee ? `${protocolFee}%` : '-';

  const total = checkedTokens.reduce((value, token) => {
    return value.plus(new BigNumber(token.valueUsd));
  }, new BigNumber(0));

  const ProtocolFeeTooltip = () => {
    return (
      <OverlayTrigger
        placement='top'
        overlay={(props) => (
          <Tooltip {...props}>
            <p></p>
          </Tooltip>
        )}
      >
        <InfoIcon style={{ width: '1.25rem', height: '1.25rem' }} />
      </OverlayTrigger>
    );
  };

  return (
    <div className='card card-info my-spacer'>
      <div className='d-flex justify-content-between flex-wrap mb-2'>
        <div className='text-secondary mr-2'>Total USDC converted</div>
        <span className='text-main'>{total.toFixed()} USDC</span>
      </div>
      <div className='d-flex justify-content-between flex-wrap mb-2'>
        <div className='text-secondary mr-2'>
          Protocol fee <ProtocolFeeTooltip />
        </div>
        <span className='text-main'>{formattedProtocolFee}</span>
      </div>
    </div>
  );
};

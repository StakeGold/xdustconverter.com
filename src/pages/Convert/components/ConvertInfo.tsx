import React from 'react';
import BigNumber from 'bignumber.js';
import { ValueWithTooltip } from 'components';

export interface ConvertInfoProps {
  token: string;
  allTokens: string[];
  onTokenChange: (token: string) => void;
  totalWegld: BigNumber;
  totalUsd: BigNumber;
  protocolFee: number;
  slippage: number;
}

export const ConvertInfo = ({
  token,
  allTokens,
  onTokenChange,
  totalWegld,
  totalUsd,
  protocolFee,
  slippage
}: ConvertInfoProps) => {
  const formattedTotalWegld = totalWegld
    .decimalPlaces(6, BigNumber.ROUND_DOWN)
    .toFixed();
  const formattedTotalUsd = totalUsd
    .decimalPlaces(2, BigNumber.ROUND_DOWN)
    .toFixed();

  return (
    <div className='card card-info my-spacer'>
      <div className='d-flex justify-content-between flex-wrap mb-2'>
        <div className='text-secondary mr-2'>Token</div>
        <span className='text-main'>
          <select onChange={(e) => onTokenChange(e.target.value)}>
            {allTokens.map((t, index) => {
              return (
                <option key={index} value={t}>
                  {t}
                </option>
              );
            })}
          </select>
        </span>
      </div>
      <div className='d-flex justify-content-between flex-wrap mb-2'>
        <div className='text-secondary mr-2'>Minimum converted</div>
        <div className='d-flex flex-column'>
          <span className='text-main'>
            <ValueWithTooltip
              formattedValue={formattedTotalWegld}
              value={totalWegld.toFixed()}
            />{' '}
            WEGLD
          </span>
          <small className='text-secondary text-right'>
            ≈ ${formattedTotalUsd}
          </small>
        </div>
      </div>
      <div className='d-flex justify-content-between flex-wrap mb-2'>
        <div className='text-secondary mr-2'>Protocol fee</div>
        <span className='text-main'>{protocolFee}%</span>
      </div>
      <div className='d-flex justify-content-between flex-wrap mb-2'>
        <div className='text-secondary mr-2'>Slippage</div>
        <span className='text-main'>{slippage * 100}%</span>
      </div>
    </div>
  );
};

import React from 'react';
import BigNumber from 'bignumber.js';
import Select from 'react-select';
import { ValueWithTooltip } from 'components';
import { AccountToken } from 'types';
import { accountTokensStyles } from './accountTokensStyles';
import './AccountTokens.scss';

export interface ConvertInfoProps {
  token: AccountToken | undefined;
  allTokens: AccountToken[];
  onTokenChange: (token: AccountToken) => void;
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

  const formatAccountToken = (data: AccountToken) => {
    return (
      <div className='d-flex flex-row align-items-center xdc__select__option'>
        <img className='mr-2' src={data.svgUrl} alt={data.ticker} />
        <span>{data.ticker}</span>
      </div>
    );
  };

  console.log({ token });

  return (
    <div className='card card-info my-spacer'>
      <div className='d-flex justify-content-between flex-wrap mb-2'>
        <div className='text-secondary mr-2'>Token</div>
        <span className='text-main'>
          <Select
            className='xdc__select'
            options={allTokens}
            formatOptionLabel={(option) => formatAccountToken(option)}
            styles={accountTokensStyles}
            placeholder='Select token'
            value={token}
            getOptionValue={(option) => option.identifier}
            onChange={(selected) => {
              selected && onTokenChange(selected);
            }}
          />
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

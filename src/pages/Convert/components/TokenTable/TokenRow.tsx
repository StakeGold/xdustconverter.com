import React from 'react';
import { useGetAccount } from '@elrondnetwork/dapp-core/hooks';
import BigNumber from 'bignumber.js';
import { ValueWithTooltip } from 'components';
import { AccountToken } from 'types';

export interface TokenRowProps {
  token: AccountToken;
  checked: boolean;
  handleCheck: () => void;
}

export const TokenRow = ({ token, checked, handleCheck }: TokenRowProps) => {
  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);

  const formattedTokenPrice = new BigNumber(token.price)
    .decimalPlaces(6)
    .toFixed();
  const tokenBalance = new BigNumber(token.balance)
    .shiftedBy(-token.decimals)
    .toFixed();
  const formattedTokenBalance = new BigNumber(token.balance)
    .shiftedBy(-token.decimals)
    .decimalPlaces(6)
    .toFixed();
  const formattedTokenValueUsd = new BigNumber(token.valueUsd)
    .decimalPlaces(6)
    .toFixed();

  return (
    <div className='table-row' onClick={handleCheck}>
      <div className='table-col title'>
        {isLoggedIn && (
          <input
            type='checkbox'
            className='mr-2'
            checked={checked}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onChange={() => {}}
          />
        )}
        <img
          src={token.assets.svgUrl}
          width={35}
          height={35}
          className='token-image mr-3'
        />
        {token.ticker}{' '}
        <small className='text-secondary'>{token.identifier}</small>
      </div>
      <div className='table-col value'>
        $
        <ValueWithTooltip
          formattedValue={formattedTokenPrice}
          value={token.price.toString()}
        />
      </div>
      <div className='table-col value'>
        <ValueWithTooltip
          formattedValue={formattedTokenBalance}
          value={tokenBalance}
        />
      </div>
      <div className='table-col value'>
        $
        <ValueWithTooltip
          formattedValue={formattedTokenValueUsd}
          value={token.valueUsd.toString()}
        />
      </div>
    </div>
  );
};

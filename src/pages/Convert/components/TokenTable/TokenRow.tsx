import React from 'react';
import { useGetAccount } from '@elrondnetwork/dapp-core/hooks';
import { FormatAmount } from '@elrondnetwork/dapp-core/UI';
import BigNumber from 'bignumber.js';
import { AccountToken } from 'types';

export interface TokenRowProps {
  token: AccountToken;
  checked: boolean;
  handleCheck: () => void;
}

export const TokenRow = ({ token, checked, handleCheck }: TokenRowProps) => {
  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);

  const tokenPrice = new BigNumber(token.price).decimalPlaces(4).toFixed();
  const tokenValueUsd = new BigNumber(token.valueUsd)
    .decimalPlaces(8)
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
      <div className='table-col value'>$ {tokenPrice}</div>
      <div className='table-col value'>
        <FormatAmount
          value={token.balance}
          decimals={token.decimals}
          showLabel={false}
          digits={8}
        />
      </div>
      <div className='table-col value'>$ {tokenValueUsd}</div>
    </div>
  );
};

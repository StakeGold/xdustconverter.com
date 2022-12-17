import React from 'react';
import { FormatAmount } from '@elrondnetwork/dapp-core/UI';
import BigNumber from 'bignumber.js';
import { AccountToken } from 'types';

export interface TokenRowProps {
  token: AccountToken;
}

export const TokenRow = ({ token }: TokenRowProps) => {
  const tokenPrice = new BigNumber(token.price).decimalPlaces(4).toFixed();
  const tokenValueUsd = new BigNumber(token.price).decimalPlaces(8).toFixed();

  return (
    <>
      <td>
        <img
          src={token.assets.svgUrl}
          width={35}
          height={35}
          className='mr-2'
        />
        {token.ticker}{' '}
        <small className='text-secondary'>{token.identifier}</small>
      </td>
      <td className='text-right'>$ {tokenPrice}</td>
      <td className='text-right'>
        <FormatAmount
          value={token.balance}
          decimals={token.decimals}
          showLabel={false}
          digits={8}
        />
      </td>
      <td className='text-right'>$ {tokenValueUsd}</td>
    </>
  );
};

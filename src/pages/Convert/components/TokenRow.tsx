import React from 'react';
import { FormatAmount } from '@elrondnetwork/dapp-core/UI';
import { AccountToken } from 'types';

export interface TokenRowProps {
  token: AccountToken;
}

export const TokenRow = ({ token }: TokenRowProps) => {
  return (
    <div>
      <div>
        <img src={token.assets.svgUrl} width={50} height={50} />
      </div>
      <div>{token.ticker}</div>
      <div>name: {token.name}</div>
      <div>price: {token.price}</div>
      <div>valueUsd: {token.valueUsd}</div>
      <div>
        balance:{' '}
        <FormatAmount
          value={token.balance}
          decimals={token.decimals}
          showLabel={false}
          digits={token.decimals}
        />
      </div>
    </div>
  );
};

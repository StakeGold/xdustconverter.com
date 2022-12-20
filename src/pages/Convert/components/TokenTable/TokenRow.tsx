import React from 'react';
import { useGetAccount } from '@elrondnetwork/dapp-core/hooks';
import BigNumber from 'bignumber.js';
import { TokenAmountWithTooltip, ValueWithTooltip } from 'components';
import { AccountToken } from 'types';

export interface TokenRowProps {
  token: AccountToken;
  checked: boolean;
  handleCheck: () => void;
}

export const TokenRow = ({ token, checked, handleCheck }: TokenRowProps) => {
  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);

  const formattedTokenValueWegld = new BigNumber(token.valueWegld)
    .decimalPlaces(6)
    .toFixed();

  const formattedTokenValueUsd = new BigNumber(token.valueUsd)
    .decimalPlaces(2)
    .toFixed();

  return (
    <div className='table-row' onClick={handleCheck}>
      <div className='table-col title'>
        <div className='d-flex flex-row align-items-center'>
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
          <div className='d-flex flex-column'>
            {isLoggedIn ? (
              <TokenAmountWithTooltip
                value={token.balance}
                decimals={token.decimals}
                egldLabel={token.ticker}
                digits={4}
              />
            ) : (
              <>{token.ticker}</>
            )}
            <small className='text-secondary'>
              ≈ ${formattedTokenValueUsd}
            </small>
          </div>
        </div>
      </div>
      <div className='table-col value'>
        {isLoggedIn && (
          <>
            <ValueWithTooltip
              formattedValue={formattedTokenValueWegld}
              value={token.valueWegld.toString()}
            />{' '}
            WEGLD
          </>
        )}
      </div>
    </div>
  );
};

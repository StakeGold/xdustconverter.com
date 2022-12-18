import React from 'react';
import { useGetAccount } from '@elrondnetwork/dapp-core/hooks';

export interface TokenHeaderProps {
  selectedAll: boolean;
  handleSelectAll: () => void;
}

export const TokenHeader = ({
  selectedAll,
  handleSelectAll
}: TokenHeaderProps) => {
  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);

  return (
    <thead>
      <tr>
        <th scope='col' className='mr-1'>
          {isLoggedIn && (
            <input
              type='checkbox'
              checked={selectedAll}
              onChange={handleSelectAll}
            />
          )}
        </th>
        <th scope='col' role='button' onClick={handleSelectAll}>
          Token
        </th>
        <th scope='col' className='text-right'>
          Price
        </th>
        <th scope='col' className='text-right'>
          Balance
        </th>
        <th scope='col' className='text-right pr-2'>
          Value USDC
        </th>
      </tr>
    </thead>
  );
};

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
    <div className='table-header table-row'>
      <div className='table-col title' onClick={handleSelectAll}>
        {isLoggedIn && (
          <input
            type='checkbox'
            className='mr-2'
            checked={selectedAll}
            onChange={handleSelectAll}
          />
        )}
        Token
      </div>
      <div className='table-col value'>{isLoggedIn ? 'Value WEGLD' : ''}</div>
    </div>
  );
};

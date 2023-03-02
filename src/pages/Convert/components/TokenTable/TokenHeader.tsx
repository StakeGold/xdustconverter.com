import React from 'react';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks';

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
      {isLoggedIn && (
        <div className='table-col title' onClick={handleSelectAll}>
          <input
            type='checkbox'
            className='mr-2'
            checked={selectedAll}
            onChange={handleSelectAll}
          />
          Select all
        </div>
      )}
      <div className='table-col value'></div>
    </div>
  );
};

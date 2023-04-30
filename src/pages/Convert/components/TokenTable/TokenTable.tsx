import React, { useEffect, useMemo, useState } from 'react';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks';
import { getIsLoggedIn } from '@multiversx/sdk-dapp/utils';
import { AccountToken, ConvertToken } from 'types';
import { TokenHeader } from './TokenHeader';
import { TokenRow } from './TokenRow';

export interface TokenTableProps {
  tokens: AccountToken[];
  convertToken?: ConvertToken;
  setCheckedTokens: (tokens: AccountToken[]) => void;
}

export const TokenTable = ({
  tokens,
  convertToken,
  setCheckedTokens
}: TokenTableProps) => {
  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);

  const [checkedState, setCheckedState] = useState<boolean[]>([]);

  useEffect(() => {
    setCheckedState(new Array(tokens.length).fill(false));
  }, [tokens]);

  const selectedAll = useMemo<boolean>(() => {
    return checkedState.reduce((result, value) => result && value, true);
  }, [checkedState]);

  const handleOnChange = (position: number) => {
    if (!getIsLoggedIn()) {
      return;
    }

    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const handleSelectAll = () => {
    const updatedCheckedState = checkedState.map(() => !selectedAll);
    setCheckedState(updatedCheckedState);
  };

  useEffect(() => {
    const checkedTokens = tokens.filter((_token, index) => checkedState[index]);
    setCheckedTokens(checkedTokens);
  }, [checkedState]);

  return (
    <div className='token-table my-spacer'>
      <TokenHeader
        selectedAll={selectedAll}
        handleSelectAll={handleSelectAll}
      />
      <div className={`card table-body ${isLoggedIn ? '' : 'grid'}`}>
        {tokens.length > 0 ? (
          tokens.map((token, index) => (
            <TokenRow
              key={token.identifier}
              convertToken={convertToken}
              token={token}
              checked={checkedState[index]}
              handleCheck={() => handleOnChange(index)}
            />
          ))
        ) : (
          <div className='m-auto'>There are no tokens available</div>
        )}
      </div>
    </div>
  );
};

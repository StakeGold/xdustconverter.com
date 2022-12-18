import React, { useEffect, useMemo, useState } from 'react';
import { AccountToken } from 'types';
import { TokenHeader } from './TokenHeader';
import { TokenRow } from './TokenRow';

export interface TokenTableProps {
  tokens: AccountToken[];
  setCheckedTokens: (tokens: AccountToken[]) => void;
}

export const TokenTable = ({ tokens, setCheckedTokens }: TokenTableProps) => {
  const [checkedState, setCheckedState] = useState<boolean[]>([]);

  useEffect(() => {
    setCheckedState(new Array(tokens.length).fill(false));
  }, [tokens]);

  const selectedAll = useMemo<boolean>(() => {
    return checkedState.reduce((result, value) => result && value, true);
  }, [checkedState]);

  const handleOnChange = (position: number) => {
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
    <div className='token-table'>
      <TokenHeader
        selectedAll={selectedAll}
        handleSelectAll={handleSelectAll}
      />
      <div className='card table-body'>
        {tokens.map((token, index) => (
          <TokenRow
            key={token.identifier}
            token={token}
            checked={checkedState[index]}
            handleCheck={() => handleOnChange(index)}
          />
        ))}
      </div>
    </div>
  );
};

import React, { useEffect, useMemo, useState } from 'react';
import { useGetAccount } from '@elrondnetwork/dapp-core/hooks';
import { AccountToken } from 'types';
import { TokenHeader } from './TokenHeader';
import { TokenRow } from './TokenRow';

export interface TokenTableProps {
  tokens: AccountToken[];
  setCheckedTokens: (tokens: AccountToken[]) => void;
}

export const TokenTable = ({ tokens, setCheckedTokens }: TokenTableProps) => {
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
      <table>
        <TokenHeader
          selectedAll={selectedAll}
          handleSelectAll={handleSelectAll}
        />
        <tbody>
          {tokens.map((token, index) => (
            <tr
              key={token.identifier}
              className='token-table-row mb-4'
              role='button'
              onClick={() => handleOnChange(index)}
            >
              <th scope='row'>
                {isLoggedIn && (
                  <input
                    type='checkbox'
                    checked={checkedState[index]}
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onChange={() => {}}
                  />
                )}
              </th>
              <TokenRow token={token} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

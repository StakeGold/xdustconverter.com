import React, { useEffect, useMemo, useState } from 'react';
import { Loader, PageState } from '@elrondnetwork/dapp-core/UI';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { TokenRow } from './components';
import { ConvertLayout } from './components/ConvertLayout';
import { useGetAccountTokens } from './hooks/useGetAccountTokens';

const ConvertPage = () => {
  const { tokens: accountTokens, isLoading, error } = useGetAccountTokens();

  const [checkedState, setCheckedState] = useState<boolean[]>([]);

  useEffect(() => {
    setCheckedState(new Array(accountTokens.length).fill(false));
  }, [accountTokens]);

  const selectedAll = useMemo<boolean>(() => {
    return checkedState.reduce((result, value) => result && value, true);
  }, [checkedState]);

  if (isLoading) {
    return <Loader />;
  }

  if (accountTokens.length !== checkedState.length) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className='my-5'>
        <PageState
          icon={faBan}
          className='text-muted'
          title='Error fetching transactions.'
        />
      </div>
    );
  }

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

  return (
    <div>
      <label>
        <input
          type='checkbox'
          checked={selectedAll}
          onChange={handleSelectAll}
        />
        <div>Select All</div>
      </label>
      {accountTokens.map((token, index) => (
        <label key={token.identifier}>
          <input
            type='checkbox'
            checked={checkedState[index]}
            onChange={() => handleOnChange(index)}
          />
          <TokenRow token={token} />
        </label>
      ))}
    </div>
  );
};

export const Convert = () => (
  <ConvertLayout>
    <ConvertPage />
  </ConvertLayout>
);

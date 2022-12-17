import React, { useEffect, useMemo, useState } from 'react';
import { Loader, PageState } from '@elrondnetwork/dapp-core/UI';
import { logout } from '@elrondnetwork/dapp-core/utils';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import ActionOrConnect from 'components/ActionOrConnect';
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

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // TODO
  };

  const handleLogout = () => {
    logout(window.location.origin);
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
      <div className='card card-info my-spacer'>
        <div className='d-flex justify-content-between flex-wrap mb-2'>
          <div className='text-secondary mr-2'>Total USDC converted</div>
          <span className='text-main'>1000 USDC</span>
        </div>
        <div className='d-flex justify-content-between flex-wrap mb-2'>
          <div className='text-secondary mr-2'>Protocol fee</div>
          <span className='text-main'>10%</span>
        </div>
      </div>
      <ActionOrConnect>
        <button
          className='btn btn-primary btn-connect'
          onClick={(e) => handleSubmit(e)}
        >
          Convert small amounts
        </button>
        <button
          className='btn btn-secondary btn-connect mt-2'
          onClick={handleLogout}
        >
          Disconnect
        </button>
      </ActionOrConnect>
    </div>
  );
};

export const Convert = () => (
  <ConvertLayout>
    <ConvertPage />
  </ConvertLayout>
);

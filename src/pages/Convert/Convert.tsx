import React, { useEffect, useMemo, useState } from 'react';
import { Loader, PageState } from '@elrondnetwork/dapp-core/UI';
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

  return (
    <div>
      <table className='token-table'>
        <thead>
          <tr>
            <th scope='col'>
              <input
                type='checkbox'
                checked={selectedAll}
                onChange={handleSelectAll}
              />
            </th>
            <th scope='col' onClick={handleSelectAll}>
              Token
            </th>
            <th scope='col'>Price</th>
            <th scope='col'>Balance</th>
            <th scope='col'>Value USDC</th>
          </tr>
        </thead>
        <tbody>
          {accountTokens.map((token, index) => (
            <tr
              key={token.identifier}
              className='mb-4'
              onClick={() => handleOnChange(index)}
            >
              <th scope='row'>
                <input
                  type='checkbox'
                  checked={checkedState[index]}
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  onChange={() => {}}
                />
              </th>
              <TokenRow token={token} />
            </tr>
          ))}
        </tbody>
      </table>
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
      </ActionOrConnect>
    </div>
  );
};

export const Convert = () => (
  <ConvertLayout>
    <ConvertPage />
  </ConvertLayout>
);

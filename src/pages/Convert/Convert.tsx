import React, { useState } from 'react';
import { Loader, PageState } from '@elrondnetwork/dapp-core/UI';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import ActionOrConnect from 'components/ActionOrConnect';
import { AccountToken } from 'types';
import { ConvertInfo, ConvertLayout, TokenTable } from './components';
import { useGetAccountTokens } from './hooks/useGetAccountTokens';

const ConvertPage = () => {
  const { tokens: accountTokens, isLoading, error } = useGetAccountTokens();
  const [checkedTokens, setCheckedTokens] = useState<AccountToken[]>([]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    // TODO style
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

  const handleSubmit = (event: any) => {
    event.preventDefault();

    console.log(checkedTokens);
    // TODO
  };

  return (
    <div>
      <TokenTable tokens={accountTokens} setCheckedTokens={setCheckedTokens} />
      <ConvertInfo checkedTokens={checkedTokens} />
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

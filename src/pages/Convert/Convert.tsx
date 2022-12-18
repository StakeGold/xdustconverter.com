import React, { useState } from 'react';
import { Loader, PageState } from '@elrondnetwork/dapp-core/UI';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { AccountToken } from 'types';
import {
  ConvertInfo,
  ConvertLayout,
  TokenTable,
  ConvertButton
} from './components';
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

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();

    console.log(checkedTokens);
    // TODO
  };

  return (
    <div>
      <TokenTable tokens={accountTokens} setCheckedTokens={setCheckedTokens} />
      <ConvertInfo checkedTokens={checkedTokens} />
      <ConvertButton handleSubmit={handleSubmit} />
    </div>
  );
};

export const Convert = () => (
  <ConvertLayout>
    <ConvertPage />
  </ConvertLayout>
);

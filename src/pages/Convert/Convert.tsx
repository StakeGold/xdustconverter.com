import React from 'react';
import {
  TransactionsTable,
  Loader,
  PageState
} from '@elrondnetwork/dapp-core/UI';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { ConvertLayout } from './components/ConvertLayout';
import { useGetAccountTokens } from './hooks/useGetAccountTokens';

const ConvertPage = () => {
  const { tokens: accountTokens, isLoading, error } = useGetAccountTokens();
  console.log(accountTokens);

  if (isLoading) {
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

  return <TransactionsTable transactions={[]} />;
};

export const Convert = () => (
  <ConvertLayout>
    <ConvertPage />
  </ConvertLayout>
);

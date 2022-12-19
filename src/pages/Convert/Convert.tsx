import React, { useEffect, useState } from 'react';
import { useGetActiveTransactionsStatus } from '@elrondnetwork/dapp-core/hooks';
import { Loader, PageState } from '@elrondnetwork/dapp-core/UI';
import { Transaction } from '@elrondnetwork/erdjs/out';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { sendAndSignTransactions } from 'apiCalls';
import { AccountToken } from 'types';
import {
  ConvertInfo,
  ConvertLayout,
  TokenTable,
  ConvertButton
} from './components';
import { useGetAccountTokens } from './hooks/useGetAccountTokens';
import { useGetSwapDustTokens } from './hooks/useGetSwapDustTokens';

const ConvertPage = () => {
  const {
    tokens: accountTokens,
    isLoading,
    error,
    fetchAccountTokens
  } = useGetAccountTokens();
  const swapDustTokens = useGetSwapDustTokens();
  const { success } = useGetActiveTransactionsStatus();

  const [checkedTokens, setCheckedTokens] = useState<AccountToken[]>([]);

  const hasTokens = accountTokens.length > 0;

  const processConvertTransaction = async (
    transaction: Transaction | undefined
  ) => {
    try {
      if (transaction === undefined) {
        return;
      }

      const displayInfo = {
        processingMessage: 'Converting small amounts',
        errorMessage: 'An error has occurred while converting small amounts',
        successMessage: 'Converting small amounts succeeded'
      };
      await sendAndSignTransactions([transaction], displayInfo);
    } catch (err: any) {
      console.log('processConvertTransaction error', err);
    }
  };

  useEffect(() => {
    if (success) {
      fetchAccountTokens();
    }
  }, [success]);

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

    const transaction = swapDustTokens(checkedTokens);
    processConvertTransaction(transaction);
  };

  return (
    <div>
      <TokenTable tokens={accountTokens} setCheckedTokens={setCheckedTokens} />
      <ConvertInfo checkedTokens={checkedTokens} />
      <ConvertButton handleSubmit={handleSubmit} disabled={!hasTokens} />
    </div>
  );
};

export const Convert = () => (
  <ConvertLayout>
    <ConvertPage />
  </ConvertLayout>
);

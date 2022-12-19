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

  const processConvertTransaction = async (
    transaction: Transaction | undefined,
    method: string
  ) => {
    try {
      if (transaction === undefined) {
        return;
      }

      await sendAndSignTransactions([transaction], method);
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

    if (checkedTokens.length === 0) {
      return;
    }

    const transaction = swapDustTokens(checkedTokens);
    processConvertTransaction(transaction, 'Convert small amounts');
  };

  return (
    <div>
      <TokenTable tokens={accountTokens} setCheckedTokens={setCheckedTokens} />
      <ConvertInfo checkedTokens={checkedTokens} />
      <ConvertButton
        handleSubmit={handleSubmit}
        disabled={checkedTokens.length === 0}
      />
    </div>
  );
};

export const Convert = () => (
  <ConvertLayout>
    <ConvertPage />
  </ConvertLayout>
);

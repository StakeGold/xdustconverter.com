import React, { useEffect, useState } from 'react';
import {
  useGetAccount,
  useGetActiveTransactionsStatus
} from '@elrondnetwork/dapp-core/hooks';
import { Loader, PageState } from '@elrondnetwork/dapp-core/UI';
import { getIsLoggedIn } from '@elrondnetwork/dapp-core/utils';
import { Transaction } from '@elrondnetwork/erdjs/out';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { sendAndSignTransactions } from 'apiCalls';
import { AccountToken } from 'types';
import {
  ConvertInfo,
  ConvertLayout,
  TokenTable,
  ConvertButton
} from './components';
import { TransactionsSignedInfo } from './components/TransactionsSignedInfo';
import { useGetProtocolFee } from './hooks';
import { useGetAccountTokens } from './hooks/useGetAccountTokens';
import { useGetSwapDustTokens } from './hooks/useGetSwapDustTokens';

const ConvertPage = () => {
  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);

  const {
    tokens: accountTokens,
    isLoading,
    error,
    reloadTokens
  } = useGetAccountTokens();
  const swapDustTokens = useGetSwapDustTokens();
  const protocolFee = useGetProtocolFee();
  const { success } = useGetActiveTransactionsStatus();

  const [checkedTokens, setCheckedTokens] = useState<AccountToken[]>([]);

  const hasTokens = checkedTokens.length > 0;

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
      reloadTokens();
    }
  }, [success]);

  if (isLoading) {
    return <Loader />;
  }

  if (error || protocolFee === undefined) {
    return (
      <div className='my-5'>
        <PageState
          icon={faClose}
          className='text-muted'
          title='Unable to load.'
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
      {isLoggedIn && (
        <ConvertInfo checkedTokens={checkedTokens} protocolFee={protocolFee} />
      )}
      <ConvertButton handleSubmit={handleSubmit} disabled={!hasTokens} />
      {getIsLoggedIn() && hasTokens && (
        <TransactionsSignedInfo transactions={1} />
      )}
    </div>
  );
};

export const Convert = () => (
  <ConvertLayout>
    <ConvertPage />
  </ConvertLayout>
);

import React, { useEffect, useState } from 'react';
import {
  useGetAccount,
  useGetActiveTransactionsStatus
} from '@elrondnetwork/dapp-core/hooks';
import { Loader, PageState } from '@elrondnetwork/dapp-core/UI';
import { getIsLoggedIn } from '@elrondnetwork/dapp-core/utils';
import { Transaction } from '@elrondnetwork/erdjs/out';
import { faClose, faSadTear } from '@fortawesome/free-solid-svg-icons';
import BigNumber from 'bignumber.js';
import { useSearchParams } from 'react-router-dom';
import { sendAndSignTransactions } from 'apiCalls';
import { SLIPPAGE } from 'config';
import { AccountToken } from 'types';
import {
  ConvertInfo,
  ConvertLayout,
  TokenTable,
  ConvertButton
} from './components';
import { TransactionsSignedInfo } from './components/TransactionsSignedInfo';
import { computeValueAfterFees } from './helpers';
import { useGetContractState, useGetProtocolFee } from './hooks';
import { useGetAccountTokens } from './hooks/useGetAccountTokens';
import { useGetSwapDustTokens } from './hooks/useGetSwapDustTokens';

const ConvertPage = () => {
  const [searchParams] = useSearchParams();
  const referralTag = searchParams.get('referral');

  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);

  const {
    tokens: accountTokens,
    isLoading,
    error,
    reloadTokens
  } = useGetAccountTokens();
  const swapDustTokens = useGetSwapDustTokens();

  const contractState = useGetContractState();
  const protocolFee = useGetProtocolFee();
  const { success, pending } = useGetActiveTransactionsStatus();

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

  if (isLoading || contractState === undefined) {
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

  if (contractState === 'Inactive') {
    return (
      <div className='my-5'>
        <PageState
          icon={faSadTear}
          className='text-muted'
          title={'xDustConverter is under maintenance'}
        />
      </div>
    );
  }

  const totalWegld = checkedTokens.reduce((value, token) => {
    return value.plus(new BigNumber(token.valueWegld));
  }, new BigNumber(0));

  const totalUsd = checkedTokens.reduce((value, token) => {
    return value.plus(new BigNumber(token.valueUsd));
  }, new BigNumber(0));

  const totalWegldAfterFees = computeValueAfterFees(
    totalWegld,
    protocolFee,
    SLIPPAGE
  );
  const totalUsdAfterFees = computeValueAfterFees(
    totalUsd,
    protocolFee,
    SLIPPAGE
  );

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();

    const transaction = swapDustTokens(
      totalWegldAfterFees,
      checkedTokens,
      referralTag
    );
    processConvertTransaction(transaction);
  };

  return (
    <div>
      <TokenTable tokens={accountTokens} setCheckedTokens={setCheckedTokens} />
      {isLoggedIn && (
        <ConvertInfo
          totalWegld={totalWegldAfterFees}
          totalUsd={totalUsdAfterFees}
          protocolFee={protocolFee}
        />
      )}
      <ConvertButton
        handleSubmit={handleSubmit}
        disabled={!hasTokens || pending}
        loading={pending}
      />
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

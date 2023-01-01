import React, { useEffect, useState } from 'react';
import {
  useGetAccount,
  useGetActiveTransactionsStatus
} from '@elrondnetwork/dapp-core/hooks';
import { Loader, PageState } from '@elrondnetwork/dapp-core/UI';
import { getIsLoggedIn } from '@elrondnetwork/dapp-core/utils';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import BigNumber from 'bignumber.js';
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
import { useGetProtocolFee } from './hooks';
import { useGetAccountTokens } from './hooks/useGetAccountTokens';
import { useGetSwapDustTokens } from './hooks/useGetSwapDustTokens';

const ConvertPage = () => {
  const referralTag = localStorage.getItem('xdc_ref');

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
  const { success, pending } = useGetActiveTransactionsStatus();

  const [checkedTokens, setCheckedTokens] = useState<AccountToken[]>([]);

  const hasTokens = checkedTokens.length > 0;

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

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      const { transaction, displayInfo } = swapDustTokens(
        totalWegldAfterFees,
        checkedTokens,
        referralTag
      );
      if (!transaction) {
        return;
      }

      await sendAndSignTransactions([transaction], displayInfo);
    } catch (err) {
      console.log('processConvertTransaction error', err);
    }
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

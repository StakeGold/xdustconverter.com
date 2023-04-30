import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '@buidly/dapp-core/dist/hooks';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import {
  useGetAccount,
  useGetActiveTransactionsStatus
} from '@multiversx/sdk-dapp/hooks';
import { Loader, PageState } from '@multiversx/sdk-dapp/UI';
import { getIsLoggedIn } from '@multiversx/sdk-dapp/utils';
import BigNumber from 'bignumber.js';
import { useGetDappConfig } from 'hooks/useGetDappConfig';
import { AccountToken } from 'types';
import {
  ConvertButton,
  ConvertInfo,
  ConvertLayout,
  TokenTable
} from './components';
import { TransactionsSignedInfo } from './components/TransactionsSignedInfo';
import { computeValueAfterFees } from './helpers';
import { useGetConvertTokens, useGetProtocolFee } from './hooks';
import { useGetAccountTokens } from './hooks/useGetAccountTokens';
import { useGetSwapDustTokens } from './hooks/useGetSwapDustTokens';

const ConvertPage = () => {
  const { dappConfig, loading: configLoading } = useGetDappConfig();

  const referralTag = localStorage.getItem('xdc_ref');

  const { address } = useGetAccount();
  const isLoggedIn = Boolean(address);

  const {
    tokens: accountTokens,
    isLoading,
    error,
    reloadTokens
  } = useGetAccountTokens();
  const {
    tokens: convertTokens,
    loading: convertTokensLoading,
    error: convertTokensError
  } = useGetConvertTokens();

  const { swapDustTokens, loading: txLoading } = useGetSwapDustTokens();

  const protocolFee = useGetProtocolFee();
  const { success, pending } = useGetActiveTransactionsStatus();

  const [checkedTokens, setCheckedTokens] = useState<AccountToken[]>([]);
  const [convertToken, setConvertToken] = useLocalStorage<
    AccountToken | undefined
  >('xdc_token', undefined);

  useEffect(() => {
    if (convertTokens.length > 0 && convertToken === undefined) {
      setConvertToken(
        convertTokens.find((t) => t.identifier.includes('WEGLD')) ??
          convertTokens[0]
      );
    }
  }, [convertTokens]);

  const hasTokens = checkedTokens.length > 0;

  useEffect(() => {
    if (success) {
      reloadTokens();
    }
  }, [success]);

  if (isLoading || convertTokensLoading || configLoading) {
    return <Loader />;
  }

  if (
    error ||
    protocolFee === undefined ||
    dappConfig === undefined ||
    convertTokensError
  ) {
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
    dappConfig.slippage
  );
  const totalUsdAfterFees = computeValueAfterFees(
    totalUsd,
    protocolFee,
    dappConfig.slippage
  );

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      // TODO insert token
      swapDustTokens(
        totalWegldAfterFees.toFixed(),
        checkedTokens,
        convertToken?.identifier ?? '',
        referralTag
      );
    } catch (err) {
      console.log('processConvertTransaction error', err);
    }
  };

  return (
    <div>
      <TokenTable tokens={accountTokens} setCheckedTokens={setCheckedTokens} />
      {isLoggedIn && (
        <ConvertInfo
          token={convertToken}
          allTokens={convertTokens}
          onTokenChange={setConvertToken}
          totalWegld={totalWegldAfterFees}
          totalUsd={totalUsdAfterFees}
          protocolFee={protocolFee}
          slippage={dappConfig.slippage}
        />
      )}
      <ConvertButton
        handleSubmit={handleSubmit}
        disabled={!hasTokens || pending || txLoading}
        loading={pending || txLoading}
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
